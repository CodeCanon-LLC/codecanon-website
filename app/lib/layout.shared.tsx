import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { NavbarLogo } from "@/components/navbar-logo";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: NavbarLogo,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
