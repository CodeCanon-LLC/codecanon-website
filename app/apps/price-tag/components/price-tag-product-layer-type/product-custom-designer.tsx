import {
  ActionAlignItems,
  ActionBorder,
  ActionBoxShadow,
  ActionColor,
  ActionCorner,
  ActionDocumentBackground,
  ActionDocumentSize,
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
  ActionPadding,
  ActionPosition,
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
  Waraq,
  WaraqFrame,
  WaraqPane,
  WaraqPaneContent,
  WaraqPanel,
  WaraqPaneTitle,
  WaraqStage,
  WaraqToolbar,
  WaraqToolbarGroup,
  WaraqToolbarSeparator,
} from "@codecanon/waraq";
import type { WaraqData } from "@codecanon/waraq/lib";
import { Action, ActionControls, ActionLabel } from "@codecanon/waraq/ui";
import { PlusIcon } from "lucide-react";
import {
  ActionInputDefaultValue,
  ActionInputMode,
  ActionInputPlaceholder,
  ActionQRCodeFgColor,
  ActionQRCodeLevel,
  ActionQRCodeValue,
} from "@/apps/price-tag/components/price-tag-layer-actions";
import {
  ActionProductInputDefaultValue,
  ActionProductQRCodeValue,
} from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-actions";
import { PRODUCT_CUSTOM_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-layer-types";
import { PRODUCT_CUSTOM_VIEW_GAP } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-view-gap";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCustomDesignerProps {
  data: WaraqData;
  onDataChange: (data: WaraqData) => void;
  maxWidth: number;
  maxHeight: number;
}

export function ProductCustomDesigner({
  data,
  onDataChange,
  maxWidth,
  maxHeight,
}: ProductCustomDesignerProps) {
  return (
    <Waraq
      data={data}
      onDataChange={onDataChange}
      layerTypes={PRODUCT_CUSTOM_LAYER_TYPES}
    >
      {/* Left Panel - Layer Types */}
      <WaraqPanel title="Layers" position="left-start" icon={PlusIcon}>
        <WaraqPane>
          <WaraqPaneTitle>Add Product Layer</WaraqPaneTitle>
          <WaraqPaneContent>
            <PaneAddLayer
              filterLayers={(layer) => layer.id.includes("product")}
            />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane>
          <WaraqPaneTitle>Add Layer</WaraqPaneTitle>
          <WaraqPaneContent>
            <PaneAddLayer
              filterLayers={(layer) => !layer.id.includes("product")}
            />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane>
          <WaraqPaneTitle>Layers</WaraqPaneTitle>
          <WaraqPaneContent>
            <PaneLayerTree />
          </WaraqPaneContent>
        </WaraqPane>
      </WaraqPanel>
      {/* Canvas */}
      <WaraqStage>
        <WaraqFrame />
      </WaraqStage>

      {/* Right Panel - Layer Properties */}
      <WaraqPanel title="Properties" position="right-start">
        <WaraqPane showFor="document">
          <WaraqPaneTitle>Area</WaraqPaneTitle>
          <WaraqPaneContent>
            <Action>
              <ActionLabel>Size</ActionLabel>
              <ActionControls className="text-muted-foreground h-7 items-center gap-4.5 px-2 font-mono text-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">W:{maxWidth}</span>
                  </TooltipTrigger>
                  <TooltipContent>Width</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">H:{maxHeight}</span>
                  </TooltipTrigger>
                  <TooltipContent>Height</TooltipContent>
                </Tooltip>
              </ActionControls>
            </Action>
            <Action>
              <ActionLabel>Grid</ActionLabel>
              <ActionControls className="text-muted-foreground h-7 items-center gap-4.5 px-2 font-mono text-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">
                      C:
                      {Math.max(
                        0,
                        Math.floor(
                          (maxWidth + PRODUCT_CUSTOM_VIEW_GAP) /
                            (data.frameSize.width + PRODUCT_CUSTOM_VIEW_GAP),
                        ),
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Columns</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">
                      R:
                      {Math.max(
                        0,
                        Math.floor(
                          (maxHeight + PRODUCT_CUSTOM_VIEW_GAP) /
                            (data.frameSize.height + PRODUCT_CUSTOM_VIEW_GAP),
                        ),
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Rows</TooltipContent>
                </Tooltip>
              </ActionControls>
            </Action>
          </WaraqPaneContent>
        </WaraqPane>

        <WaraqPane showFor="document">
          <WaraqPaneTitle>Document</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionDocumentSize
              minFrameSize={{ width: 100, height: 100 }}
              maxFrameSize={{ width: maxWidth, height: maxHeight }}
            />
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
        <WaraqPane showFor={["product-qrcode"]}>
          <WaraqPaneContent>
            <ActionProductQRCodeValue />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["qrcode"]}>
          <WaraqPaneContent>
            <ActionQRCodeValue />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["qrcode", "product-qrcode"]}>
          <WaraqPaneTitle>QR Code</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionQRCodeFgColor />
            <ActionQRCodeLevel />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["input", "product-input"]}>
          <WaraqPaneTitle>Input</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionInputPlaceholder />
            <ActionInputMode />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["input"]}>
          <WaraqPaneContent>
            <ActionInputDefaultValue />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["product-input"]}>
          <WaraqPaneTitle>Default Value</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionProductInputDefaultValue />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane
          showFor={[
            "text",
            "input",
            "product-name",
            "product-sku",
            "product-price",
            "product-input",
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
        <WaraqPane showFor={["image", "product-image"]}>
          <WaraqPaneTitle>Image</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionImageEdit />
            <ActionImageFit />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor={["image", "product-image"]}>
          <WaraqPaneTitle>Filters</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionImageFilter />
          </WaraqPaneContent>
        </WaraqPane>
      </WaraqPanel>

      {/* Toolbar */}
      <WaraqToolbar>
        <WaraqToolbarGroup>
          <ActionToolbarTool />
        </WaraqToolbarGroup>
        <WaraqToolbarSeparator />
        <WaraqToolbarGroup>
          <ActionToolbarHistory />
        </WaraqToolbarGroup>
        <WaraqToolbarSeparator />
        <ActionToolbarZoom />
      </WaraqToolbar>
    </Waraq>
  );
}
