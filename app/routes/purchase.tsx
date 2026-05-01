import { useState, useMemo, useEffect, useTransition } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { cn } from "@/lib/cn";
import { baseOptions } from "@/lib/layout.shared";
import { Skeleton } from "@/components/ui/skeleton";

const PAYMENT_LINKS = {
  waraq: import.meta.env.VITE_STRIPE_PAYMENT_LINK_WARAQ as string,
  nuska: import.meta.env.VITE_STRIPE_PAYMENT_LINK_NUSKA as string,
  bundle: import.meta.env.VITE_STRIPE_PAYMENT_LINK_BUNDLE as string,
};

export function meta() {
  const title = "Purchase — CodeCanon";
  const description =
    "Get lifetime access to CodeCanon libraries. One-time purchase, instant npm access.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://codecanon.dev/purchase" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://codecanon.dev/purchase",
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

type ProductId = "waraq" | "nuska";

const PRODUCTS: {
  id: ProductId;
  name: string;
  description: string;
  highlights: string[];
}[] = [
  {
    id: "waraq",
    name: "@codecanon/waraq",
    description:
      "Canva-like drag-and-drop design editor for React 19. Composable panels, 50+ action components, Google Fonts, undo/redo, and serializable JSON state.",
    highlights: [
      "50+ action components",
      "Google Fonts picker",
      "Undo / redo history",
      "Serializable JSON state",
      "Mobile-responsive panels",
    ],
  },
  {
    id: "nuska",
    name: "@codecanon/nuska",
    description:
      "Headless git-like version control for any key/value datasource. Commits, branches, diffs, 3-way merge — framework-agnostic with adapters for IndexedDB, PostgreSQL, MongoDB.",
    highlights: [
      "Commits & branches",
      "3-way merge & diffs",
      "IndexedDB + PostgreSQL adapters",
      "Pull requests API",
      "Framework-agnostic",
    ],
  },
];

const PRICES_WORKER_URL = import.meta.env.VITE_PRICES_WORKER_URL as string;

interface Prices {
  waraq: number;
  nuska: number;
  bundle: number;
}

export default function Purchase() {
  const [selected, setSelected] = useState<Set<ProductId>>(new Set());
  const [prices, setPrices] = useState<Prices | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const r = await fetch(`${PRICES_WORKER_URL}/prices`);
        const data = await r.json();
        setPrices(data as Prices);
      } catch {}
    });
  }, []);

  function toggle(id: ProductId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const checkoutLink = useMemo(() => {
    if (selected.has("waraq") && selected.has("nuska"))
      return PAYMENT_LINKS.bundle;
    if (selected.has("waraq")) return PAYMENT_LINKS.waraq;
    if (selected.has("nuska")) return PAYMENT_LINKS.nuska;
    return undefined;
  }, [selected]);

  const total =
    prices === null
      ? null
      : selected.has("waraq") && selected.has("nuska")
        ? prices.bundle
        : selected.has("waraq")
          ? prices.waraq
          : selected.has("nuska")
            ? prices.nuska
            : null;

  const savings =
    prices !== null && selected.size === 2
      ? prices.waraq + prices.nuska - prices.bundle
      : 0;

  return (
    <HomeLayout {...baseOptions()}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            CodeCanon Libraries
          </p>
          <h1 className="text-4xl font-bold mb-3">Get access</h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            One-time purchase. Lifetime access including all minor and patch
            updates. Secure checkout powered by Stripe.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          {PRODUCTS.map((product) => {
            const isSelected = selected.has(product.id);
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggle(product.id)}
                className={cn(
                  "group text-left rounded-xl border-2 p-6 transition-all duration-150",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    <span className="font-mono font-semibold text-sm leading-none block mb-1.5">
                      {product.name}
                    </span>
                    {isPending ? (
                      <Skeleton className="h-8 w-20 mt-1" />
                    ) : prices !== null ? (
                      <span className="text-2xl font-bold">
                        ${prices[product.id]}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          one-time
                        </span>
                      </span>
                    ) : null}
                  </div>

                  {/* Checkbox */}
                  <div
                    className={cn(
                      "mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40 group-hover:border-primary/50",
                    )}
                  >
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>

                <ul className="space-y-1.5">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="text-primary font-bold">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Bundle discount */}
        {selected.size === 2 && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-3.5 mb-6 text-sm flex items-center justify-center gap-2">
            <span className="font-semibold text-primary">
              Bundle discount applied
            </span>
            <span className="text-muted-foreground">—</span>
            <span className="text-muted-foreground">
              {savings > 0
                ? `You save $${savings} by purchasing both libraries.`
                : "Bundle discount applied."}
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href={checkoutLink}
            aria-disabled={!checkoutLink}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
              "px-8 h-12 text-sm w-full max-w-sm transition-all",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              !checkoutLink &&
                "opacity-40 cursor-not-allowed pointer-events-none",
            )}
          >
            {!checkoutLink
              ? "Select a library to continue"
              : total !== null
                ? `Proceed to checkout — $${total}`
                : "Proceed to checkout"}
          </a>

          <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
            After payment you'll receive an email with your private install
            token and setup instructions.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-lg font-semibold mb-6 text-center">
            Common questions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.q}>
                <p className="font-medium text-sm mb-1">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

const FAQ = [
  {
    q: "How do I install after purchase?",
    a: "After payment you'll receive an email with a private install token and setup instructions. Add two lines to your .npmrc and you're ready to install.",
  },
  {
    q: "How many machines can I use the token on?",
    a: "Each token allows up to 3 unique machines (e.g. your dev machine, CI, and a staging server). Need more seats? Email us.",
  },
  {
    q: "Can I use it in multiple projects?",
    a: "Yes. One token works across any number of projects on your licensed machines.",
  },
  {
    q: "What's included with updates?",
    a: "All minor and patch updates for the major version you purchased. Major version upgrades will be offered at a discounted upgrade price.",
  },
  {
    q: "Do you offer refunds?",
    a: "If you have trouble getting the library working, reach out first — we'll help. Refund requests within 7 days are handled case-by-case.",
  },
  {
    q: "Questions before buying?",
    a: "Email us at codecanonllc@gmail.com and we'll get back to you quickly.",
  },
];
