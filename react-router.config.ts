import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";
import { createGetUrl, getSlugs } from "fumadocs-core/source";
import { getPageImagePath } from "./app/lib/og";

const getUrl = createGetUrl("/docs");

export default {
  ssr: true,
  future: {
    v8_middleware: true,
  },
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = ["/api/search"];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    const mdxFiles = (
      readdirSync("content/docs", { recursive: true }) as string[]
    ).filter((f) => f.endsWith(".mdx"));

    for (const entry of mdxFiles) {
      const slugs = getSlugs(entry);
      paths.push(getUrl(slugs));
      paths.push(getPageImagePath(slugs));
    }

    return paths;
  },
} satisfies Config;
