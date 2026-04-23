import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Link } from "react-router";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { baseOptions } from "@/lib/layout.shared";
import { getDocsLink } from "@/lib/links";
import type { Route } from "./+types/purchase.success";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Purchase confirmed — CodeCanon" },
    {
      name: "description",
      content:
        "Your purchase was successful. Check your email for access instructions.",
    },
  ];
}

export default function PurchaseSuccess() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10">
          <svg
            className="w-8 h-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment confirmed</h1>

        <p className="text-muted-foreground leading-relaxed mb-8">
          Thank you for your purchase! Check your email — you'll receive your
          private install token and setup instructions within a few minutes.
        </p>

        <div className="rounded-xl border bg-card p-6 text-left mb-8 space-y-4">
          <h2 className="font-semibold text-sm">What happens next</h2>
          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to={getDocsLink()} className={buttonVariants()}>
            Browse documentation →
          </Link>
          <a
            href="mailto:codecanonllc@gmail.com"
            className={buttonVariants({ variant: "outline" })}
          >
            Contact support
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

const STEPS = [
  "You'll receive a confirmation email with your private install token.",
  "Add two lines to your project's .npmrc to point @codecanon packages to our registry.",
  "Run npm install @codecanon/waraq (or nuska) — your token authenticates the download.",
  "Questions? Reply to the email or reach us at codecanonllc@gmail.com.",
];
