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
  useWaraqTool,
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
import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import { PRICE_TAG_ABLES } from "@/apps/price-tag/components/price-tag-layer-ables";
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
import { PRICE_TAG_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-layer-types";
import type { ProductLayerData } from "@/apps/price-tag/components/price-tag-product-layer-type";
import type { UserLayerData } from "@/apps/price-tag/components/price-tag-user-layer-type";
import { getPriceTagDesigns } from "@/apps/price-tag/lib/api";
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
import { PRICE_TAG_MOCK } from "@/lib/mocks";
import type { PriceTag } from "@/types/price-tag";

function Header() {
  const { setTheme } = useTheme();

  return (
    <WaraqToolbar position="top">
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

function Toolbar(props: { hideTools?: boolean }) {
  const showTools = useIsBreakpoint("min-md");
  const { tool } = useWaraqTool();

  return (
    <WaraqToolbar>
      {showTools && !props.hideTools && (
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

        <WaraqKeyboardShortcuts asChild>
          <Button size="icon" variant="ghost" tooltip="Keyboard Shortcuts">
            <CircleQuestionMark className="size-3.5" />
          </Button>
        </WaraqKeyboardShortcuts>
      </WaraqToolbarGroup>
    </WaraqToolbar>
  );
}

function PriceTagDesigns() {
  const { data: docs, isPending } = useQuery({
    queryKey: ["price-tag-designs"],
    queryFn: () => getPriceTagDesigns(),
  });

  return (
    <WaraqPanel title="Properties" position="left-start">
      <WaraqPane>
        <WaraqPaneTitle>Select</WaraqPaneTitle>
        <WaraqPaneContent>
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
        </WaraqPaneContent>
      </WaraqPane>
    </WaraqPanel>
  );
}

function LayersPanel(props: React.ComponentProps<typeof WaraqPanel>) {
  const { tool } = useWaraqTool();

  if (tool === "select") {
    return <PriceTagDesigns />;
  }

  return (
    <WaraqPanel title="Layers" position="left-start" icon={PlusIcon} {...props}>
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

function PropertiesPanel(props: React.ComponentProps<typeof WaraqPanel>) {
  return (
    <WaraqPanel title="Properties" position="right-start" {...props}>
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
      <WaraqPane showFor={["todays-date"]}>
        <WaraqPaneTitle>Date</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionDateFormat />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["select"]}>
        <WaraqPaneTitle>Select Options</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionSelectOptions />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["product"]}>
        <WaraqPaneTitle>Products</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionProductDisplayStyle />
          <ActionProductMaxSelectCount />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane
        showFor={[
          (layer: Layer<ProductLayerData>) =>
            layer.type === "product" && layer.data?.displayStyle === "custom",
        ]}
      >
        <WaraqPaneTitle>Custom Layout</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionProductCustomDesign />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["user"]}>
        <WaraqPaneTitle>User</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionUserDisplayStyle />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane
        showFor={[
          (layer: Layer<UserLayerData>) =>
            layer.type === "user" &&
            (layer.data?.displayStyle || "profile") === "profile",
        ]}
      >
        <WaraqPaneTitle>User</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionUserSize />
          <ActionColor />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane
        showFor={[
          (layer: Layer<UserLayerData>) =>
            layer.type === "user" && layer.data?.displayStyle === "avatar",
        ]}
      >
        <WaraqPaneTitle>User</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionUserSize />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["input"]}>
        <WaraqPaneTitle>Input</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionInputPlaceholder />
          <ActionInputMode />
          <ActionInputDefaultValue />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["qrcode"]}>
        <WaraqPaneTitle>QR Code Value</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionQRCodeValue />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["qrcode"]}>
        <WaraqPaneTitle>QR Code Style</WaraqPaneTitle>
        <WaraqPaneContent>
          <ActionQRCodeFgColor />
          <ActionQRCodeLevel />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane showFor={["text"]}>
        <WaraqPaneContent>
          <ActionTextValue />
        </WaraqPaneContent>
      </WaraqPane>
      <WaraqPane
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

export function PriceTagDesigner({
  priceTagId,
  priceTag,
  loading,
  ...props
}: {
  priceTagId: string;
  priceTag: PriceTag | null;
  loading?: boolean;
} & Partial<React.ComponentProps<typeof Waraq>>) {
  const [data, setData] = useLocalStorage<PriceTag>(
    `price-tag-template-${priceTagId}`,
    {
      id: priceTagId,
      name: "New Template",
      frameSize: DEFAULT_FRAME_SIZE,
      frameBackgroundColor: DEFAULT_FRAME_BACKGROUND_COLOR,
      layers: [],
    },
  );

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies: this causes the component to
   * freeze when price tag changes, we only want to set data on initial load or when priceTag changes
   */
  useEffect(() => {
    if (priceTag) {
      setData(priceTag);
    }
  }, [priceTag]);

  return (
    <Waraq
      {...props}
      data={data}
      onDataChange={setData}
      layerTypes={PRICE_TAG_LAYER_TYPES}
    >
      <WaraqBackground />
      <Header />
      <LayersPanel />
      <WaraqStage>
        <WaraqFrame ables={PRICE_TAG_ABLES}>
          {loading && (
            <Skeleton className="absolute top-0 left-0 z-11 size-full rounded-none" />
          )}
        </WaraqFrame>
      </WaraqStage>
      <PropertiesPanel />
      <Toolbar />
    </Waraq>
  );
}

export function PriceTagDesignerDemo() {
  return (
    <Waraq
      initialLayers={PRICE_TAG_MOCK.layers}
      layerTypes={PRICE_TAG_LAYER_TYPES}
    >
      <WaraqBackground />
      <LayersPanel defaultCollapsed />
      <WaraqStage>
        <WaraqFrame ables={PRICE_TAG_ABLES} />
      </WaraqStage>
      <PropertiesPanel defaultCollapsed />
      <Toolbar hideTools />
    </Waraq>
  );
}
