import { useState } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { cn } from "@/lib/cn";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types/purchase";

const PAYMENT_LINKS = {
  waraq: import.meta.env.VITE_STRIPE_PAYMENT_LINK_WARAQ as string,
  nuska: import.meta.env.VITE_STRIPE_PAYMENT_LINK_NUSKA as string,
  bundle: import.meta.env.VITE_STRIPE_PAYMENT_LINK_BUNDLE as string,
};

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Purchase — CodeCanon" },
    {
      name: "description",
      content:
        "Get lifetime access to CodeCanon libraries. One-time purchase, instant npm access.",
    },
  ];
}

type ProductId = "waraq" | "nuska";

const PRODUCTS: {
  id: ProductId;
  name: string;
  price: number;
  description: string;
  highlights: string[];
}[] = [
  {
    id: "waraq",
    name: "@codecanon/waraq",
    price: 149,
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
    price: 99,
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

const BUNDLE_PRICE = 199;

export default function Purchase() {
  const [selected, setSelected] = useState<Set<ProductId>>(new Set());

  function toggle(id: ProductId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleCheckout() {
    let url: string | undefined;

    if (selected.has("waraq") && selected.has("nuska")) {
      url = PAYMENT_LINKS.bundle;
    } else if (selected.has("waraq")) {
      url = PAYMENT_LINKS.waraq;
    } else if (selected.has("nuska")) {
      url = PAYMENT_LINKS.nuska;
    }

    if (url) window.location.href = url;
  }

  const total =
    selected.has("waraq") && selected.has("nuska")
      ? BUNDLE_PRICE
      : selected.has("waraq")
        ? PRODUCTS[0].price
        : selected.has("nuska")
          ? PRODUCTS[1].price
          : null;

  const savings =
    selected.size === 2
      ? PRODUCTS[0].price + PRODUCTS[1].price - BUNDLE_PRICE
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
                    <span className="text-2xl font-bold">
                      ${product.price}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        one-time
                      </span>
                    </span>
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
              You save ${savings} by purchasing both libraries.
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={selected.size === 0}
            onClick={handleCheckout}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
              "px-8 h-12 text-sm w-full max-w-sm transition-all",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              selected.size === 0 && "opacity-40 cursor-not-allowed pointer-events-none",
            )}
          >
            {total !== null
              ? `Proceed to checkout — $${total}`
              : "Select a library to continue"}
          </button>

          <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
            You'll be asked for your npm username during checkout so we can
            grant you access instantly after payment.
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
    a: "After payment you'll receive an email with setup instructions. We'll add your npm account to the package so you can install it with your existing credentials.",
  },
  {
    q: "What npm username should I use?",
    a: "Use the username of the npm account you install packages from. You can find it by running `npm whoami` in your terminal.",
  },
  {
    q: "Can I use it in multiple projects?",
    a: "Yes. One purchase grants your npm account access — you can use it in any number of personal or commercial projects.",
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
