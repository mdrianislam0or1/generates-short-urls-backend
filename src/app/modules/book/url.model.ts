import mongoose, { Document, Schema } from "mongoose";

export interface UrlDocument extends Document {
  longUrl: string;
  shortUrl: string;
}

const UrlSchema = new Schema({
  longUrl: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
});

export const UrlModel = mongoose.model<UrlDocument>("Url", UrlSchema);
