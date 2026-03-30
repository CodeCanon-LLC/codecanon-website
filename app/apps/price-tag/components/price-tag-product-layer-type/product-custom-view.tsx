import {
  WaraqProvider as DesignerProvider,
  WaraqStaticFrame as DesignerStaticFrame,
  useWaraq as useDesigner,
} from "@codecanon/waraq";
import type { Layer } from "@codecanon/waraq/lib";
import { Palette } from "lucide-react";
import type { ProductLayerData } from "@/apps/price-tag/components/price-tag-product-layer-type";
import { PRODUCT_CUSTOM_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-layer-types";
import { PRODUCT_CUSTOM_VIEW_GAP } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-view-gap";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ProductCustomViewProps {
  layer: Layer<ProductLayerData>;
}

export function ProductCustomView({ layer }: ProductCustomViewProps) {
  const { updateLayer } = useDesigner();

  if (
    !layer.data?.customDesign?.layers.length ||
    !layer.data?.products.length
  ) {
    return <ProductCustomEmptyView />;
  }

  return (
    <div
      className="flex size-full flex-row flex-wrap content-start justify-between overflow-auto"
      style={{ gap: PRODUCT_CUSTOM_VIEW_GAP }}
    >
      {layer.data.products.map((product) => {
        const design =
          layer.data?.productDesign?.[product.id] || layer.data?.customDesign;

        return (
          <DesignerProvider
            key={product.id}
            data={design}
            layerTypes={PRODUCT_CUSTOM_LAYER_TYPES}
            onDataChange={(design) => {
              updateLayer({
                id: layer.id,
                data: {
                  ...layer.data,
                  productDesign: {
                    ...layer.data?.productDesign,
                    [product.id]: design,
                  },
                },
              });
            }}
          >
            <DesignerStaticFrame
              className="shrink-0 shadow-none"
              injectLayerData={() => ({ product })}
            />
          </DesignerProvider>
        );
      })}
    </div>
  );
}

function ProductCustomEmptyView() {
  return (
    <div className="flex size-full items-center justify-center">
      <Empty className="p-4!">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-gray-100 text-black">
            <Palette />
          </EmptyMedia>
          <EmptyTitle className="text-black">No product design</EmptyTitle>
          <EmptyDescription className="text-gray-500">
            Click "Edit Custom Layout" to define style for each product
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
