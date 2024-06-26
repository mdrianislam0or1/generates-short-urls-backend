import request from "supertest";
import mongoose from "mongoose";
import { UrlModel } from "../app/modules/book/url.model";
import app from "../app";
import config from "../app/config";

describe("URL Shortener API", () => {
  beforeAll(async () => {
    await mongoose.connect(config.database_url as string);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await UrlModel.deleteMany({});
  });

  test("should shorten a long URL", async () => {
    const longUrl = "https://example.com";

    const response = await request(app).post("/api/url").send({ longUrl });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.data).toBe("string");
  });

  test("should redirect to the long URL", async () => {
    const longUrl = "https://example.com";
    const shortUrl = "zbTYjc";

    await new UrlModel({ longUrl, shortUrl }).save();

    const response = await request(app).get(`/api/url/${shortUrl}`);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe(longUrl);
  });

  test("should return 404 for unknown short URL", async () => {
    const response = await request(app).get("/api/url/unknown");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Short URL not found");
  });
});
