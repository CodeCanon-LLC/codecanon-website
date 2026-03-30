import type { ProductDisplay as Product } from "@/apps/price-tag/components/price-tag-product-layer-type";

const SAMPLE_PRODUCT: Product = {
  id: "product-id",
  name: "Product Name",
  sku: "SKU-000",
  price: 0,
};

// Helper function to replace product property placeholders
export function replaceProductProperties(
  template: string,
  product: Product = SAMPLE_PRODUCT,
): string {
  if (!product || !template) return template;

  return template
    .replace(/@product\.name/g, product.name)
    .replace(/@product\.sku/g, product.sku)
    .replace(/@product\.price/g, product.price.toString())
    .replace(/@product\.id/g, product.id)
    .replace(/@product\.image/g, product.image || "");
}
