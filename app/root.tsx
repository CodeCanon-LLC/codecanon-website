import {
  PresetPickerContent,
  PresetPickerList,
  PresetPickerSheet,
  PresetPickerThemeToggleGroup,
  PresetProvider,
} from "@codecanon/next-presets";
import { RootProvider } from "fumadocs-ui/provider/react-router";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { PresetPickerButton } from "@/components/preset-picker-button";
import SearchDialog from "@/components/search";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./routes/not-found";
import { getDocsNextPresetsLink, getNextPresetsDemoLink } from "@/lib/links";
import { Button } from "@/components/ui/button";
import { AppWindowIcon, FileText } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function meta() {
  return [
    { property: "og:site_name", content: "CodeCanon" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://codecanon.dev/assets/og.png" },
    { property: "og:image:width", content: "2400" },
    { property: "og:image:height", content: "1264" },
    { property: "og:image:alt", content: "CodeCanon — Software & Consultation" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "https://codecanon.dev/assets/og.png" },
    { name: "twitter:site", content: "@codecanon" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/assets/light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <TooltipProvider>
          <RootProvider search={{ SearchDialog }}>
            <PresetProvider>
              <PresetPickerSheet>
                {children}
                <PresetPickerContent>
                  <PresetPickerThemeToggleGroup />
                  <PresetPickerList />
                  <div className="mb-4 flex gap-2 *:flex-1">
                    <Button asChild variant="outline">
                      <Link to={getDocsNextPresetsLink()}>
                        <FileText />
                        Docs
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={getNextPresetsDemoLink()}>
                        <AppWindowIcon />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </PresetPickerContent>
                <PresetPickerButton />
              </PresetPickerSheet>
            </PresetProvider>
          </RootProvider>
        </TooltipProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <NotFound />;
    message = "Error";
    details = error.statusText;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 w-full max-w-[1400px] mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
