import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("waraq", "routes/waraq/layout.tsx", [
    index("routes/waraq/index.tsx"),
    route("demo", "routes/waraq/demo.tsx"),
    route("performance", "routes/waraq/performance.tsx"),
    route("price-tag", "routes/waraq/price-tag/layout.tsx", [
      index("routes/waraq/price-tag/index.tsx"),
      route("design/:id", "routes/waraq/price-tag/design.tsx"),
      route("template/:id", "routes/waraq/price-tag/template.tsx"),
    ]),
  ]),
  route("docs/*", "routes/docs.tsx"),
  route("api/search", "routes/search.ts"),

  // LLM integration:
  route("llms.txt", "llms/index.ts"),
  route("llms-full.txt", "llms/full.ts"),
  route("llms.mdx/docs/*", "llms/mdx.ts"),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
