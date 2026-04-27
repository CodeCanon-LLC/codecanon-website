import type { LayerType, WaraqData } from "@codecanon/waraq/lib";
import { IconShoppingCart } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ProductLayerSelect } from "@/apps/price-tag/components/price-tag-layer-select";
import { ProductCustomView } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-view";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";
import { useWaraqTool } from "@codecanon/waraq";

export type ProductLayerDisplayStyle =
  | "card"
  | "grid"
  | "table"
  | "list"
  | "custom";

// Helper type for product display in price tag
export interface ProductDisplay {
  id: string;
  name: string;
  sku: string;
  price: number;
  image?: string;
}

export interface ProductLayerData {
  displayStyle: ProductLayerDisplayStyle;
  products: ProductDisplay[];
  customDesign?: WaraqData;
  productDesign?: Record<string, WaraqData>;
  maxSelectCount?: number;
}

// Helper function to convert Product to ProductDisplay
export function toProductDisplay(product: Product): ProductDisplay {
  return {
    id: product.id,
    name: product.name,
    sku: product.brand_sku,
    price: product.derived.retail_price,
    image: product.primary_image,
  };
}

// Product layer type - displays products in various styles
export const ProductLayerType: LayerType<ProductLayerData> = {
  id: "product",
  name: "Products",
  icon: <IconShoppingCart size={16} />,
  Component({ layer }) {
    const [open, setOpen] = useState(false);
    const displayStyle = layer.data?.displayStyle || "card";
    const products = layer.data?.products || [];
    const { tool } = useWaraqTool()

    return (
      <>
        <div style={layer.contentStyle}>
          {products.length === 0 ? (
            <ProductEmptyView />
          ) : displayStyle === "custom" ? (
            <ProductCustomView layer={layer} />
          ) : displayStyle === "grid" ? (
            <ProductGridView products={products} />
          ) : displayStyle === "table" ? (
            <ProductTableView products={products} />
          ) : displayStyle === "list" ? (
            <ProductListView products={products} />
          ) : (
            <ProductCardView products={products} />
          )}
        </div>
        {tool !== "move" && (
          <div
            className={cn(
              "transition-opactiy absolute top-0 right-0 z-2 opacity-0 group-hover/layer-product:opacity-100 focus:opacity-100",
              open && "opacity-100"
            )}
          >
            <ProductLayerSelect
              asChild
              open={open}
              onOpenChange={setOpen}
              layerId={layer.id}
            >
              <Button size="icon">
                <ChevronDown />
              </Button>
            </ProductLayerSelect>
          </div>
        )}
      </>
    );
  },
  defaultValues: {
    cssVars: {
      "--width": "500px",
      "--height": "300px",
    },
    data: {
      displayStyle: "card",
      products: [],
    },
  },
  keyboardShortcut: {
    description: "Add Product",
    keys: ["P"],
    action: (context) => context.addLayer("product"),
    category: "Layer",
  },
};

// Product Grid View
function ProductGridView({ products }: { products: ProductDisplay[] }) {
  return (
    <div
      className="grid size-full auto-rows-min gap-4 overflow-auto p-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        backgroundColor: "#ffffff",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-2 rounded p-3"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full rounded object-cover"
            />
          )}
          <div className="font-medium">{product.name}</div>
          <div className="text-sm" style={{ color: "#9ca3af" }}>
            {product.sku}
          </div>
          <div className="text-lg font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

// Product Table View (grid with header)
function ProductTableView({ products }: { products: ProductDisplay[] }) {
  return (
    <div className="size-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr
            style={{
              backgroundColor: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <th className="p-2 text-left font-semibold">Image</th>
            <th className="p-2 text-left font-semibold">Name</th>
            <th className="p-2 text-left font-semibold">SKU</th>
            <th className="p-2 text-right font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td className="p-2">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-12 rounded object-cover"
                  />
                )}
              </td>
              <td className="p-2 font-medium">{product.name}</td>
              <td className="p-2 text-sm" style={{ color: "#9ca3af" }}>
                {product.sku}
              </td>
              <td className="p-2 text-right text-lg font-semibold text-green-600">
                ${product.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Product Card View (3 columns layout)
function ProductCardView({ products }: { products: ProductDisplay[] }) {
  return (
    <div className="flex size-full flex-col gap-3 overflow-auto p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-[auto_1fr_auto] gap-4 rounded p-3"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
        >
          {/* Column 1: Image */}
          <div className="flex items-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="size-20 rounded object-cover"
              />
            ) : (
              <div
                className="flex size-20 items-center justify-center rounded"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <IconShoppingCart size={32} style={{ color: "#9ca3af" }} />
              </div>
            )}
          </div>

          {/* Column 2: Name (top) + SKU (bottom, small, muted) */}
          <div className="flex flex-col justify-center gap-1">
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-xs" style={{ color: "#9ca3af" }}>
              {product.sku}
            </div>
          </div>

          {/* Column 3: Price (large, green) */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Product List View (compact layout without cards)
function ProductListView({ products }: { products: ProductDisplay[] }) {
  return (
    <div className="flex size-full flex-col overflow-auto">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="grid grid-cols-[auto_1fr_auto] gap-3 p-3"
          style={{
            borderBottom:
              index < products.length - 1 ? "1px solid #e5e7eb" : undefined,
          }}
        >
          {/* Column 1: Image */}
          <div className="flex items-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="size-12 rounded object-cover"
              />
            ) : (
              <div
                className="flex size-12 items-center justify-center rounded"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <IconShoppingCart size={20} style={{ color: "#9ca3af" }} />
              </div>
            )}
          </div>

          {/* Column 2: Name (top) + SKU (bottom, small, muted) */}
          <div className="flex flex-col justify-center gap-0.5">
            <div className="font-medium">{product.name}</div>
            <div className="text-xs" style={{ color: "#9ca3af" }}>
              {product.sku}
            </div>
          </div>

          {/* Column 3: Price */}
          <div className="flex items-center">
            <div className="text-lg font-semibold text-green-600">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductEmptyView() {
  return (
    <div className="flex size-full items-center justify-center">
      <Empty className="p-4!">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-gray-100 text-black">
            <IconShoppingCart />
          </EmptyMedia>
          <EmptyTitle className="text-black">No products selected</EmptyTitle>
          <EmptyDescription className="text-gray-500">
            Select products to display in this layer
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
