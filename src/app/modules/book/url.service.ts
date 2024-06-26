import { UrlDocument, UrlModel } from "./url.model";

const generateShortUrl = (id: number): string => {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const base = alphabet.length;

  let shortUrl = "";
  while (id > 0) {
    const remainder = id % base;
    shortUrl = alphabet[remainder] + shortUrl;
    id = Math.floor(id / base);
  }

  const desiredLength = 6;
  while (shortUrl.length < desiredLength) {
    shortUrl = alphabet[0] + shortUrl;
  }

  return shortUrl;
};

const shortenUrl = async (longUrl: string): Promise<string> => {
  try {
    let url = await UrlModel.findOne({ longUrl });
    if (url) {
      return url.shortUrl;
    }

    const count = await UrlModel.countDocuments();
    const shortUrl = generateShortUrl(count + 1);
    url = new UrlModel({ longUrl, shortUrl });
    await url.save();

    return shortUrl;
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw new Error("Failed to generate short URL");
  }
};

const getLongUrl = async (shortUrl: string): Promise<string> => {
  try {
    const url: UrlDocument | null = await UrlModel.findOne({ shortUrl });
    if (!url) {
      throw { status: 404, message: "Short URL not found" };
    }

    return url.longUrl;
  } catch (error) {
    console.error("Error retrieving long URL:", error);
    throw error;
  }
};

export const UrlServices = {
  shortenUrl,
  getLongUrl,
};
