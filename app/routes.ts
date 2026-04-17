import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nuska", "routes/nuska/layout.tsx", [
    index("routes/nuska/index.tsx"),
    route("demo", "routes/nuska/demo.tsx"),
  ]),
  route("next-presets", "routes/next-presets/layout.tsx", [
    index("routes/next-presets/index.tsx"),
    route("demo", "routes/next-presets/demo.tsx"),
  ]),
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
  route("purchase", "routes/purchase.tsx"),
  route("purchase/success", "routes/purchase.success.tsx"),
  route("docs/*", "routes/docs.tsx"),
  route("api/search", "routes/search.ts"),

  // LLM integration:
  route("llms.txt", "llms/index.ts"),
  route("llms-full.txt", "llms/full.ts"),
  route("llms.mdx/docs/*", "llms/mdx.ts"),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
