import { Request, Response } from "express";
import { UrlServices } from "./url.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const shortenUrlHandler = catchAsync(async (req: Request, res: Response) => {
  const { longUrl } = req.body;
  const shortUrl = await UrlServices.shortenUrl(longUrl);
  sendResponse<string>(res, {
    statusCode: 201,
    success: true,
    message: "Short URL generated successfully",
    data: shortUrl,
  });
});

const redirectHandler = catchAsync(async (req: Request, res: Response) => {
  const { shortUrl } = req.params;
  const longUrl = await UrlServices.getLongUrl(shortUrl);
  res.redirect(longUrl);
});

export const UrlControllers = {
  shortenUrlHandler,
  redirectHandler,
};
