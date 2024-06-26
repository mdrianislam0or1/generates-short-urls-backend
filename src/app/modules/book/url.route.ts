import express from "express";
import { UrlControllers } from "./url.controller";
import validateRequest from "../../middleware/validateRequest";
import { urlValidationSchema } from "./url.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(urlValidationSchema),
  UrlControllers.shortenUrlHandler
);
router.get("/:shortUrl", UrlControllers.redirectHandler);

export const UrlRouters = router;
