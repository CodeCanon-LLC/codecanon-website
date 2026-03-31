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
  Waraq as Designer,
  WaraqStage as DesignerCanvas,
  WaraqFrame as DesignerFrame,
  WaraqPane as DesignerPane,
  WaraqPaneContent as DesignerPaneContent,
  WaraqPanel as DesignerPanel,
  WaraqPaneTitle as DesignerPaneTitle,
  WaraqToolbar as DesignerToolbar,
  WaraqToolbarGroup as DesignerToolbarGroup,
  WaraqToolbarSeparator as DesignerToolbarSeparator,
  PaneAddLayer,
  PaneLayerTree,
} from "@codecanon/waraq";
import type { WaraqData as DesignerData } from "@codecanon/waraq/lib";
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
  data: DesignerData;
  onDataChange: (data: DesignerData) => void;
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
    <Designer
      data={data}
      onDataChange={onDataChange}
      layerTypes={PRODUCT_CUSTOM_LAYER_TYPES}
    >
      
        {/* Left Panel - Layer Types */}
        <DesignerPanel title="Layers" position="top-left" icon={PlusIcon}>
          <DesignerPane>
            <DesignerPaneTitle>Add Product Layer</DesignerPaneTitle>
            <DesignerPaneContent>
              <PaneAddLayer
                filterLayers={(layer) => layer.id.includes("product")}
              />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane>
            <DesignerPaneTitle>Add Layer</DesignerPaneTitle>
            <DesignerPaneContent>
              <PaneAddLayer
                filterLayers={(layer) => !layer.id.includes("product")}
              />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane>
            <DesignerPaneTitle>Layers</DesignerPaneTitle>
            <DesignerPaneContent>
              <PaneLayerTree />
            </DesignerPaneContent>
          </DesignerPane>
        </DesignerPanel>
        {/* Canvas */}
        <DesignerCanvas>
          <DesignerFrame />
        </DesignerCanvas>

        {/* Right Panel - Layer Properties */}
        <DesignerPanel title="Properties" position="top-right">
          <DesignerPane showFor="document">
            <DesignerPaneTitle>Area</DesignerPaneTitle>
            <DesignerPaneContent>
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
            </DesignerPaneContent>
          </DesignerPane>

          <DesignerPane showFor="document">
            <DesignerPaneTitle>Document</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionDocumentSize
                minFrameSize={{ width: 100, height: 100 }}
                maxFrameSize={{ width: maxWidth, height: maxHeight }}
              />
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
          <DesignerPane showFor={["text"]}>
            <DesignerPaneContent>
              <ActionTextValue />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["product-qrcode"]}>
            <DesignerPaneContent>
              <ActionProductQRCodeValue />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["qrcode"]}>
            <DesignerPaneContent>
              <ActionQRCodeValue />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["qrcode", "product-qrcode"]}>
            <DesignerPaneTitle>QR Code</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionQRCodeFgColor />
              <ActionQRCodeLevel />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["input", "product-input"]}>
            <DesignerPaneTitle>Input</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionInputPlaceholder />
              <ActionInputMode />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["input"]}>
            <DesignerPaneContent>
              <ActionInputDefaultValue />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["product-input"]}>
            <DesignerPaneTitle>Default Value</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionProductInputDefaultValue />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane
            showFor={[
              "text",
              "input",
              "product-name",
              "product-sku",
              "product-price",
              "product-input",
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
          <DesignerPane showFor={["image", "product-image"]}>
            <DesignerPaneTitle>Image</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionImageEdit />
              <ActionImageFit />
            </DesignerPaneContent>
          </DesignerPane>
          <DesignerPane showFor={["image", "product-image"]}>
            <DesignerPaneTitle>Filters</DesignerPaneTitle>
            <DesignerPaneContent>
              <ActionImageFilter />
            </DesignerPaneContent>
          </DesignerPane>
        </DesignerPanel>

      {/* Toolbar */}
      <DesignerToolbar>
        <DesignerToolbarGroup>
          <ActionToolbarTool />
        </DesignerToolbarGroup>
        <DesignerToolbarSeparator />
        <DesignerToolbarGroup>
          <ActionToolbarHistory />
        </DesignerToolbarGroup>
        <DesignerToolbarSeparator />
        <ActionToolbarZoom />
      </DesignerToolbar>
    </Designer>
  );
}
