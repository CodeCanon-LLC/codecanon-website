import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Link } from "react-router";
import { NavbarLogo } from "@/components/navbar-logo";
import { getPurchaseLink } from "./links";
import { gitConfig } from "./shared";

export function baseOptions(opts?: { hidePurchase?: boolean }): BaseLayoutProps {
  return {
    nav: {
      title: NavbarLogo,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: opts?.hidePurchase
      ? []
      : [
          {
            type: "custom",
            secondary: true,
            children: (
              <Link
                to={getPurchaseLink()}
                className="w-full inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Purchase
              </Link>
            ),
          },
        ],
  };
}
