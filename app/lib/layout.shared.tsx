import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { gitConfig } from "./shared";
import { NavbarLogo } from "@/components/navbar-logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: NavbarLogo,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
