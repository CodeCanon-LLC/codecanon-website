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
  WaraqStage,
  WaraqToolbar,
  WaraqToolbarGroup,
} from "@codecanon/waraq";
import type { Layer } from "@codecanon/waraq/lib";
import { Button } from "@codecanon/waraq/ui";
import { CircleQuestionMark, MoonIcon, PlusIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsBreakpoint } from "@/hooks/use-breakpoint";

function Header() {
  const { setTheme } = useTheme();

  return (
    <WaraqToolbar position="top-center">
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
  return (
    <WaraqPanel position="top-left" icon={PlusIcon}>
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
  return (
    <WaraqPanel position="top-right">
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

const initialLayers: Layer[] = [
  {
    id: "codecanon-logo-initial",
    type: "image",
    name: "Code Canon Logo",
    value: "/assets/light.png",
    parentStyle: {},
    contentStyle: {},
    cssVars: {
      "--width": "720px",
      "--height": "960px",
      "--object-fit": "contain",
    },
    transform: {
      translate: [48, 48],
      rotate: 0,
      scale: [1, 1],
    },
  },
];

export function WaraqDemoFull() {
  return (
    <Waraq className="h-screen w-screen" initialLayers={initialLayers}>
      <WaraqBackground />
      <Header />
      <LayersPanel />
      <WaraqStage>
        <WaraqFrame />
      </WaraqStage>
      <PropertiesPanel />
      <Toolbar />
    </Waraq>
  );
}
