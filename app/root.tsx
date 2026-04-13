import {
  PresetPicker,
  PresetPickerContent,
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
];

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
              <PresetPicker>
                {children}
                <PresetPickerSheet>
                  <PresetPickerThemeToggleGroup />
                  <PresetPickerContent />
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
                </PresetPickerSheet>
                <PresetPickerButton />
              </PresetPicker>
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
