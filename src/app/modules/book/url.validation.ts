import { z } from "zod";

export const urlValidationSchema = z.object({
  longUrl: z.string().url("Must be a valid URL"),
});
