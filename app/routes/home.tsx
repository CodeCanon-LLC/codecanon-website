import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { Browser } from "@/components/browser";
import { Loader } from "@/components/loader";
import { baseOptions } from "@/lib/layout.shared";
import {
  getDocsLink,
  getDocsNuskaLink,
  getDocsWaraqLink,
  getWaraqDemoLink,
} from "@/lib/links";
import type { Route } from "./+types/home";

const WaraqDemo = lazy(() => import("@/components/waraq-demo"));

export function meta(_: Route.MetaArgs) {
  return [
    { title: "CodeCanon — Software & Consultation" },
    {
      name: "description",
      content:
        "Composable TypeScript libraries and software consultation by CodeCanon LLC. Design editors, version control, and more — for any stack.",
    },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative border-b py-24 px-6 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="h-150 w-200 rounded-full bg-fd-primary/5 blur-3xl -translate-y-1/3" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold tracking-tight leading-tight md:text-6xl">
            Developer tooling for
            <br />
            <span className="text-fd-primary">modern applications</span>
          </h1>

          <p className="mb-10 text-lg text-fd-muted-foreground leading-relaxed max-w-xl mx-auto">
            CodeCanon builds composable TypeScript libraries and provides
            software consultation services. From canvas editors to headless
            version control — drop them into any stack.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to={getDocsLink()}
              className={buttonVariants({ variant: "primary" })}
            >
              Browse libraries →
            </Link>
            <Link
              to={getDocsWaraqLink()}
              className={buttonVariants({ variant: "outline" })}
            >
              Get started with Waraq
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live editor demo ──────────────────────────────────────────── */}
      <section className="px-6 py-20 border-b">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 items-center">
          <div className="mb-10 text-center w-full">
            <p className="text-xs font-semibold uppercase tracking-widest text-fd-primary mb-2">
              @codecanon/waraq
            </p>
            <h2 className="text-3xl font-bold mb-3">Try the editor live</h2>
            <p className="text-fd-muted-foreground max-w-lg mx-auto">
              Add layers, move and resize them, tweak colours — everything runs
              in your browser right now.
            </p>
          </div>

          {/* Browser-chrome wrapper */}
          <Browser link={getWaraqDemoLink()}>
            <Suspense fallback={<Loader>Loading editor…</Loader>}>
              <WaraqDemo />
            </Suspense>
          </Browser>
        </div>
      </section>

      {/* ── Feature highlights ────────────────────────────────────────── */}
      <section className="px-6 py-20 border-b">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-fd-primary mb-2">
              @codecanon/waraq
            </p>
            <h2 className="text-3xl font-bold mb-3">Everything included</h2>
            <p className="text-fd-muted-foreground">
              One package — no headless setup, no extra wiring required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border bg-fd-card p-6">
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Libraries ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-b">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Libraries</h2>
            <p className="text-fd-muted-foreground">
              Packages ready to drop into any project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to={getDocsWaraqLink()}
              className="group flex flex-col rounded-xl border bg-fd-card p-6 hover:border-fd-primary transition-colors"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-fd-primary/10 px-2 py-0.5 text-xs font-semibold text-fd-primary">
                  v2
                </span>
                <span className="font-mono font-semibold">
                  @codecanon/waraq
                </span>
              </div>
              <p className="flex-1 mb-4 text-sm text-fd-muted-foreground leading-relaxed">
                Canva-like drag-and-drop design editor for React 19. Composable
                panels, 50+ action components, Google Fonts, undo/redo, and
                serializable JSON state.
              </p>
              <span className="flex items-center gap-1 text-xs font-medium text-fd-primary group-hover:gap-2 transition-all">
                View documentation →
              </span>
            </Link>

            <Link
              to={getDocsNuskaLink()}
              className="group flex flex-col rounded-xl border bg-fd-card p-6 hover:border-fd-primary transition-colors"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-fd-primary/10 px-2 py-0.5 text-xs font-semibold text-fd-primary">
                  v0.1
                </span>
                <span className="font-mono font-semibold">
                  @codecanon/nuska
                </span>
              </div>
              <p className="flex-1 mb-4 text-sm text-fd-muted-foreground leading-relaxed">
                Headless git-like version control for any key/value datasource.
                Commits, branches, diffs, 3-way merge, and pull requests —
                framework-agnostic, with adapters for IndexedDB, PostgreSQL,
                MongoDB, or any custom store.
              </p>
              <span className="flex items-center gap-1 text-xs font-medium text-fd-primary group-hover:gap-2 transition-all">
                View documentation →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Consultation CTA ──────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-fd-primary">
            CodeCanon LLC
          </p>
          <h2 className="mb-4 text-3xl font-bold">Need custom development?</h2>
          <p className="mb-8 text-fd-muted-foreground leading-relaxed">
            We provide software consultation and full-stack development services
            — from architecture reviews to building production-ready
            applications from scratch, across any stack.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:codecanonllc@gmail.com"
              className={buttonVariants()}
            >
              Get in touch
            </a>
            <a
              href="https://github.com/CodeCanon-LLC"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

const features = [
  {
    icon: "🧩",
    title: "Composable layout",
    description:
      "Assemble the editor from Waraq, WaraqStage, WaraqPanel, and WaraqToolbar exactly the way you want it.",
  },
  {
    icon: "⚡",
    title: "50+ action components",
    description:
      "Pre-built controls for position, size, fill, border, shadow, typography, image editing, and more.",
  },
  {
    icon: "🎨",
    title: "Google Fonts",
    description:
      "First-class font picker backed by the Google Fonts API. No extra configuration needed.",
  },
  {
    icon: "↩",
    title: "Undo / redo",
    description:
      "Built-in history management with 20+ keyboard shortcuts, all fully customizable.",
  },
  {
    icon: "📦",
    title: "Serializable state",
    description:
      "Import and export designs as plain JSON with createWaraqData. Store anywhere.",
  },
  {
    icon: "📱",
    title: "Responsive panels",
    description:
      "Panels collapse to bottom drawers on mobile via a configurable breakpoint.",
  },
] as const;
