import browserCollections from "collections/browser";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { useLocation } from "react-router";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { useMDXComponents } from "@/components/mdx";
import { Markdown } from "@/hooks/use-markdown";
import { baseOptions } from "@/lib/layout.shared";
import { gitConfig } from "@/lib/shared";
import { getPageMarkdownUrl, source } from "@/lib/source";
import type { Route } from "./+types/docs";
import { getDocsNextPresetsLink } from "@/lib/links";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params["*"].split("/").filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response("Not found", { status: 404 });

  return {
    path: page.path,
    markdownUrl: getPageMarkdownUrl(page).url,
    pageTree: await source.serializePageTree(source.getPageTree()),
  };
}

const clientLoader = browserCollections.docs.createClientLoader({
  component: function Component(
    { toc, frontmatter, default: Mdx },
    // you can define props for the component
    {
      markdownUrl,
      path,
    }: {
      markdownUrl: string;
      path: string;
    },
  ) {
    return (
      <DocsPage toc={toc} tableOfContent={{ style: "clerk" }}>
        <title>{frontmatter.title} — CodeCanon</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:title" content={`${frontmatter.title} — CodeCanon`} />
        <meta property="og:description" content={frontmatter.description} />
        <meta name="twitter:title" content={`${frontmatter.title} — CodeCanon`} />
        <meta name="twitter:description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`}
          />
        </div>
        <DocsBody>
          <Markdown>
            <Mdx components={useMDXComponents()} />
          </Markdown>
        </DocsBody>
      </DocsPage>
    );
  },
});

export default function Page({ loaderData }: Route.ComponentProps) {
  const { pageTree, path, markdownUrl } = useFumadocsLoader(loaderData);
  const { pathname } = useLocation();
  const hidePurchase = pathname.startsWith(getDocsNextPresetsLink());

  return (
    <DocsLayout
      {...baseOptions({ hidePurchase })}
      sidebar={{
        className: 'bg-sidebar'
      }}
      tree={pageTree}
      tabs={[
        {
          title: "@codecanon/waraq",
          url: "/docs/waraq",
          description: "Design editor library",
        },
        {
          title: "@codecanon/nuska",
          url: "/docs/nuska",
          description: "Git-like version control for any datasource",
        },
        {
          title: "@codecanon/next-presets",
          url: "/docs/next-presets",
          description: "50+ shadcn/ui color presets with theme switching",
        },
      ]}
    >
      {clientLoader.useContent(loaderData.path, {
        markdownUrl,
        path,
      })}
    </DocsLayout>
  );
}
