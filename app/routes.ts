import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("reset", "routes/reset.tsx"),
  route("/:shortCode", "routes/redirect.tsx"),
] satisfies RouteConfig;
