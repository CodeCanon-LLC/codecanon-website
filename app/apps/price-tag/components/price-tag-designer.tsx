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
  Waraq as Designer,
  WaraqStage as DesignerCanvas,
  WaraqFrame as DesignerFrame,
  WaraqKeyboardShortcuts as DesignerKeyboardShortcuts,
  WaraqPane as DesignerPane,
  WaraqPaneContent as DesignerPaneContent,
  WaraqPanel as DesignerPanel,
  WaraqPaneTitle as DesignerPaneTitle,
  WaraqToolbar as DesignerToolbar,
  WaraqToolbarGroup as DesignerToolbarGroup,
  PaneAddLayer,
  PaneLayerTree,
  useWaraq as useDesigner,
  WaraqBackground,
  WaraqToolbar,
  WaraqToolbarGroup,
} from "@codecanon/waraq";
import {
  DEFAULT_FRAME_BACKGROUND_COLOR,
  DEFAULT_FRAME_SIZE,
  type Layer,
} from "@codecanon/waraq/lib";
import { Action, Button } from "@codecanon/waraq/ui";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  CircleQuestionMark,
  FileIcon,
  HomeIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { CANVAS_ABLES } from "@/apps/price-tag/components/price-tag-layer-ables";
import {
  ActionDateFormat,
  ActionInputDefaultValue,
  ActionInputMode,
  ActionInputPlaceholder,
  ActionProductCustomDesign,
  ActionProductDisplayStyle,
  ActionProductMaxSelectCount,
  ActionQRCodeFgColor,
  ActionQRCodeLevel,
  ActionQRCodeValue,
  ActionSelectOptions,
  ActionUserDisplayStyle,
  ActionUserSize,
} from "@/apps/price-tag/components/price-tag-layer-actions";
import { CANVAS_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-layer-types";
import type { ProductLayerData } from "@/apps/price-tag/components/price-tag-product-layer-type";
import type { UserLayerData } from "@/apps/price-tag/components/price-tag-user-layer-type";
import { getCanvasDesigns } from "@/apps/price-tag/lib/api";
import { PRICE_TAG_MOCK } from "@/lib/mocks";
import { Loader } from "@/components/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsBreakpoint } from "@/hooks/use-breakpoint";
import { getWaraqPriceTagDesignLink, getWaraqPriceTagLink } from "@/lib/links";
import type { Canvas } from "@/types/canvas";

function Header() {
  const { setTheme } = useTheme();

  return (
    <WaraqToolbar position="top-center">
      <WaraqToolbarGroup>
        <Button asChild tooltip="Home Page" size="icon" variant="ghost">
          <Link to={getWaraqPriceTagLink()}>
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

function CanvasToolbar(props: { hideTools?: boolean }) {
  const showTools = useIsBreakpoint("min-md");
  const { tool } = useDesigner();

  return (
    <DesignerToolbar>
      {showTools && !props.hideTools && (
        <DesignerToolbarGroup>
          <ActionToolbarTool />
        </DesignerToolbarGroup>
      )}

      {tool !== "select" && (
        <DesignerToolbarGroup>
          <ActionToolbarHistory />
        </DesignerToolbarGroup>
      )}

      <DesignerToolbarGroup>
        <ActionToolbarZoom />

        <DesignerKeyboardShortcuts asChild>
          <Button size="icon" variant="ghost" tooltip="Keyboard Shortcuts">
            <CircleQuestionMark className="size-3.5" />
          </Button>
        </DesignerKeyboardShortcuts>
      </DesignerToolbarGroup>
    </DesignerToolbar>
  );
}

function CanvasDesigns() {
  const { data: docs, isPending } = useQuery({
    queryKey: ["canvas-docs"],
    queryFn: () => getCanvasDesigns(),
  });

  return (
    <DesignerPanel title="Properties" position="top-left">
      <DesignerPane>
        <DesignerPaneTitle>Select</DesignerPaneTitle>
        <DesignerPaneContent>
          {isPending ? (
            <Action orientation="vertical">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </Action>
          ) : docs?.length ? (
            <Action orientation="vertical">
              {docs?.map((doc) => (
                <NavLink to={getWaraqPriceTagDesignLink(doc.id)} key={doc.id}>
                  {({ isActive }) => (
                    <Button
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className="justify-start"
                    >
                      <p className="flex w-full min-w-0 flex-1 gap-2">
                        <FileIcon />
                        <span className="min-w-0 flex-1 truncate">
                          {doc.name}
                        </span>
                      </p>
                    </Button>
                  )}
                </NavLink>
              ))}
            </Action>
          ) : (
            <Empty className="w-full flex-1 px-0!">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileIcon />
                </EmptyMedia>
                <EmptyTitle>No designs found</EmptyTitle>
                <EmptyDescription>
                  Create your first design to get started
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </DesignerPaneContent>
      </DesignerPane>
    </DesignerPanel>
  );
}

function LayersPanel(props: React.ComponentProps<typeof DesignerPanel>) {
  const { tool } = useDesigner();

  if (tool === "select") {
    return <CanvasDesigns />;
  }

  return (
    <DesignerPanel
      title="Layers"
      position="top-left"
      icon={PlusIcon}
      {...props}
    >
      <DesignerPane>
        <DesignerPaneTitle>Add Layer</DesignerPaneTitle>
        <DesignerPaneContent>
          <PaneAddLayer />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane>
        <DesignerPaneTitle>Layers</DesignerPaneTitle>
        <DesignerPaneContent>
          <PaneLayerTree />
        </DesignerPaneContent>
      </DesignerPane>
    </DesignerPanel>
  );
}

function PropertiesPanel(props: React.ComponentProps<typeof DesignerPanel>) {
  return (
    <DesignerPanel title="Properties" position="top-right" {...props}>
      <DesignerPane showFor="document">
        <DesignerPaneTitle>Document</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionDocumentSize />
          <ActionDocumentSizePreset />
          <ActionDocumentBackground />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor="layer">
        <DesignerPaneTitle>Layer</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionPosition />
          <ActionSize />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor="layer">
        <DesignerPaneTitle>Styles</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionCorner />
          <ActionBorder />
          <ActionBoxShadow />
          <ActionPadding />
          <ActionFill />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor="layer">
        <DesignerPaneTitle>Transform</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionRotate />
          <ActionFlip />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["todays-date"]}>
        <DesignerPaneTitle>Date</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionDateFormat />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["select"]}>
        <DesignerPaneTitle>Select Options</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionSelectOptions />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["product"]}>
        <DesignerPaneTitle>Products</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionProductDisplayStyle />
          <ActionProductMaxSelectCount />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane
        showFor={[
          (layer: Layer<ProductLayerData>) =>
            layer.type === "product" && layer.data?.displayStyle === "custom",
        ]}
      >
        <DesignerPaneTitle>Custom Layout</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionProductCustomDesign />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["user"]}>
        <DesignerPaneTitle>User</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionUserDisplayStyle />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane
        showFor={[
          (layer: Layer<UserLayerData>) =>
            layer.type === "user" &&
            (layer.data?.displayStyle || "profile") === "profile",
        ]}
      >
        <DesignerPaneTitle>User</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionUserSize />
          <ActionColor />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane
        showFor={[
          (layer: Layer<UserLayerData>) =>
            layer.type === "user" && layer.data?.displayStyle === "avatar",
        ]}
      >
        <DesignerPaneTitle>User</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionUserSize />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["input"]}>
        <DesignerPaneTitle>Input</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionInputPlaceholder />
          <ActionInputMode />
          <ActionInputDefaultValue />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["qrcode"]}>
        <DesignerPaneTitle>QR Code Value</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionQRCodeValue />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["qrcode"]}>
        <DesignerPaneTitle>QR Code Style</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionQRCodeFgColor />
          <ActionQRCodeLevel />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["text"]}>
        <DesignerPaneContent>
          <ActionTextValue />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane
        showFor={[
          "text",
          "todays-date",
          "select",
          "input",
          (layer: Layer<UserLayerData>) =>
            layer.type === "user" &&
            (layer.data?.displayStyle === "email" ||
              layer.data?.displayStyle === "name"),
        ]}
      >
        <DesignerPaneTitle>Text</DesignerPaneTitle>
        <DesignerPaneContent>
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
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["image"]}>
        <DesignerPaneTitle>Image</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionImageEdit />
          <ActionImageFit />
        </DesignerPaneContent>
      </DesignerPane>
      <DesignerPane showFor={["image"]}>
        <DesignerPaneTitle>Filters</DesignerPaneTitle>
        <DesignerPaneContent>
          <ActionImageFilter />
        </DesignerPaneContent>
      </DesignerPane>
    </DesignerPanel>
  );
}

export function CanvasDesigner({
  canvasId,
  canvas,
  loading,
  ...props
}: {
  canvasId: string;
  canvas?: Canvas | null;
  loading?: boolean;
} & Partial<React.ComponentProps<typeof Designer>>) {
  const [data, setData] = useLocalStorage<Canvas>(
    `canvas-template-${canvasId}`,
    {
      id: canvasId,
      name: "New Template",
      frameSize: DEFAULT_FRAME_SIZE,
      frameBackgroundColor: DEFAULT_FRAME_BACKGROUND_COLOR,
      layers: [],
    },
  );

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies: this causes the component to
   * freeze when canvas changes, we only want to set data on initial load or when canvasId changes
   */
  useEffect(() => {
    if (canvas) {
      setData(canvas);
    }
  }, [canvas]);

  return (
    <Designer
      {...props}
      data={data}
      onDataChange={setData}
      layerTypes={CANVAS_LAYER_TYPES}
    >
      <WaraqBackground />
      <Header />
      <LayersPanel />
      <DesignerCanvas>
        <DesignerFrame ables={CANVAS_ABLES}>
          {loading && (
            <Skeleton className="absolute top-0 left-0 z-11 size-full rounded-none" />
          )}
        </DesignerFrame>
      </DesignerCanvas>
      <PropertiesPanel />
      <CanvasToolbar />
    </Designer>
  );
}

export function CanvasDesignerDemo() {
  return (
    <Designer
      initialLayers={PRICE_TAG_MOCK.layers}
      layerTypes={CANVAS_LAYER_TYPES}
    >
      <WaraqBackground />
      <LayersPanel defaultCollapsed />
      <DesignerCanvas>
        <DesignerFrame ables={CANVAS_ABLES} />
      </DesignerCanvas>
      <PropertiesPanel defaultCollapsed />
      <CanvasToolbar hideTools />
    </Designer>
  );
}
