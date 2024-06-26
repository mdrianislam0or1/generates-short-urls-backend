import { Router } from "express";
import { UrlRouters } from "../modules/book/url.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/api/url",
    route: UrlRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
