import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "./dashboard/page.tsx"),
] satisfies RouteConfig;
