import {
  ActionAlignItems,
  ActionBorder,
  ActionBoxShadow,
  ActionColor,
  ActionCorner,
  ActionDocumentBackground,
  ActionDocumentSize,
  ActionDocumentSizePreset,
  ActionDownloadDocument,
  ActionFill,
  ActionFlip,
  ActionFont,
  ActionFontSize,
  ActionFontStyle,
  ActionFontWeight,
  ActionImageEdit,
  ActionImageFilter,
  ActionImageFit,
  ActionLetterSpacing,
  ActionLineHeight,
  ActionOpenDocument,
  ActionPadding,
  ActionPosition,
  ActionPrintDocument,
  ActionRotate,
  ActionSize,
  ActionTextAlign,
  ActionTextDecoration,
  ActionTextShadow,
  ActionTextStroke,
  ActionTextTransform,
  ActionTextValue,
  ActionToolbarHistory,
  ActionToolbarTool,
  ActionToolbarZoom,
  PaneAddLayer,
  PaneLayerTree,
  useWaraq,
  Waraq,
  WaraqBackground,
  WaraqFrame,
  WaraqKeyboardShortcuts,
  WaraqPane,
  WaraqPaneContent,
  WaraqPanel,
  WaraqPaneTitle,
  type WaraqProps,
  WaraqStage,
  WaraqToolbar,
  WaraqToolbarGroup,
} from "@codecanon/waraq";
import { Button } from "@codecanon/waraq/ui";
import {
  CircleQuestionMark,
  HomeIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router";
import { useIsBreakpoint } from "@/hooks/use-breakpoint";
import { useMarkdown } from "@/hooks/use-markdown";
import { CODE_CANON_LOGO_IMAGE_LAYER, PEROFRMANCE_MOCK } from "@/lib/mocks";
import { cn } from "@/lib/utils";

function Header() {
  const { setTheme } = useTheme();

  return (
    <WaraqToolbar position="top-center">
      <WaraqToolbarGroup>
        <Button asChild tooltip="Home Page" size="icon" variant="ghost">
          <Link to="/">
            <HomeIcon />
          </Link>
        </Button>
      </WaraqToolbarGroup>
      <WaraqToolbarGroup>
        <ActionOpenDocument />
      </WaraqToolbarGroup>
      <WaraqToolbarGroup>
        <ActionPrintDocument variant="ghost" />
        <ActionDownloadDocument variant="ghost" />
      </WaraqToolbarGroup>
      <WaraqToolbarGroup>
        <Button
          tooltip="Toggle Theme"
          variant="ghost"
          onClick={() =>
            setTheme((theme) => (theme === "dark" ? "light" : "dark"))
          }
        >
          <MoonIcon className="hidden dark:block" />
          <SunIcon className="dark:hidden" />
        </Button>
      </WaraqToolbarGroup>
    </WaraqToolbar>
  );
}

function Toolbar() {
  const showTools = useIsBreakpoint("min-md");
  const { tool } = useWaraq();

  return (
    <WaraqToolbar>
      {showTools && (
        <WaraqToolbarGroup>
          <ActionToolbarTool />
        </WaraqToolbarGroup>
      )}
      {tool !== "select" && (
        <WaraqToolbarGroup>
          <ActionToolbarHistory />
        </WaraqToolbarGroup>
      )}
      <WaraqToolbarGroup>
        <ActionToolbarZoom />
      </WaraqToolbarGroup>
      <WaraqToolbarGroup>
        <WaraqKeyboardShortcuts asChild>
          <Button size="icon" variant="ghost" tooltip="Keyboard Shortcuts">
            <CircleQuestionMark className="size-3.5" />
          </Button>
        </WaraqKeyboardShortcuts>
      </WaraqToolbarGroup>
    </WaraqToolbar>
  );
}

function LayersPanel() {
  const markdown = useMarkdown();

  return (
    <WaraqPanel
      position="top-left"
      icon={PlusIcon}
      defaultCollapsed={markdown.isMarkdown}
    >
      <WaraqPane>
        <WaraqPaneTitle>Add Layer</WaraqPaneTitle>
        <WaraqPaneContent>
          <PaneAddLayer />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane>
        <WaraqPaneTitle>Layers</WaraqPaneTitle>
        <WaraqPaneContent>
          <PaneLayerTree />
        </WaraqPaneContent>
      </WaraqPane>
    </WaraqPanel>
  );
}

function PropertiesPanel() {
  const markdown = useMarkdown();

  return (
    <WaraqPanel position="top-right" defaultCollapsed={markdown.isMarkdown}>
      <WaraqPane showFor="document">
        <WaraqPaneTitle>Document</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionDocumentSize />
          <ActionDocumentSizePreset />
          <ActionDocumentBackground />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor="layer">
        <WaraqPaneTitle>Layer</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionPosition />
          <ActionSize />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor="layer">
        <WaraqPaneTitle>Styles</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionCorner />
          <ActionBorder />
          <ActionBoxShadow />
          <ActionPadding />
          <ActionFill />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor="layer">
        <WaraqPaneTitle>Transform</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionRotate />
          <ActionFlip />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["text"]}>
        <WaraqPaneContent>
          <ActionTextValue />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["text"]}>
        <WaraqPaneTitle>Text</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionFont apiKey={import.meta.env.VITE_GOOGLE_FONTS_API_KEY} />
          <ActionFontWeight />
          <ActionColor />
          <ActionFontSize />
          <ActionLineHeight />
          <ActionLetterSpacing />
          <ActionAlignItems />
          <ActionTextAlign />
          <ActionFontStyle />
          <ActionTextDecoration />
          <ActionTextTransform />
          <ActionTextShadow />
          <ActionTextStroke />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["image"]}>
        <WaraqPaneTitle>Image</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionImageEdit />
          <ActionImageFit />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["image"]}>
        <WaraqPaneTitle>Filters</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionImageFilter />
        </WaraqPaneContent>
      </WaraqPane>
    </WaraqPanel>
  );
}

export function WaraqDemo({
  initialLayers = [CODE_CANON_LOGO_IMAGE_LAYER],
}: Pick<WaraqProps, "initialLayers">) {
  const markdown = useMarkdown();

  return (
    <Waraq
      className={cn(!markdown.isMarkdown && "h-screen w-screen")}
      initialLayers={initialLayers}
    >
      <WaraqBackground />
      {!markdown.isMarkdown && <Header />}
      <LayersPanel />
      <WaraqStage>
        <WaraqFrame />
      </WaraqStage>
      <PropertiesPanel />
      <Toolbar />
    </Waraq>
  );
}

export function WaraqPerformanceDemo() {
  return <WaraqDemo initialLayers={PEROFRMANCE_MOCK.layers} />;
}
