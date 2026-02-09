import { CodeCanonIcon, CodeCanonText } from "@codecanon/logos"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "CodeCanon-LLC",
  repo: "codecanon-website",
  branch: "main",
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center">
          <CodeCanonIcon />
          <CodeCanonText className="h-16" />
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}
