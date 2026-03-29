import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";
import { createGetUrl, getSlugs } from "fumadocs-core/source";

const getUrl = createGetUrl("/docs");

export default {
  ssr: false,
  future: {
    v8_middleware: true,
  },
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = [];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    const mdxFiles = (
      readdirSync("content/docs", { recursive: true }) as string[]
    ).filter((f) => f.endsWith(".mdx"));

    for (const entry of mdxFiles) {
      const slugs = getSlugs(entry);
      paths.push(
        getUrl(slugs),
        `/llms.mdx/docs/${[...slugs, "content.md"].join("/")}`,
      );
    }

    return paths;
  },
} satisfies Config;
