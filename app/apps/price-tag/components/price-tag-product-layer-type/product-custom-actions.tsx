import { useWaraqAction } from "@codecanon/waraq";
import { Textarea } from "@codecanon/waraq/ui";
import type { ProductInputLayerData } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-layer-types";
import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
} from "@/components/ui/mention";

// Product properties for autocomplete
const PRODUCT_PROPERTIES = [
  { value: "product.name", label: "Product Name" },
  { value: "product.sku", label: "Product SKU" },
  { value: "product.price", label: "Product Price" },
  { value: "product.id", label: "Product ID" },
  { value: "product.image", label: "Product Image URL" },
];

// Product QR Code Value Action with mention support
export const ActionProductQRCodeValue = () => {
  const { layer, setLayer } = useWaraqAction();

  const value = layer?.value || "";

  return (
    <Mention
      trigger="@"
      inputValue={value}
      onInputValueChange={(value) => setLayer({ value })}
    >
      <MentionInput
        value={value}
        className="bg-secondary"
        placeholder="Enter URL or text with @product properties..."
        asChild
      >
        <Textarea />
      </MentionInput>
      <MentionContent>
        {PRODUCT_PROPERTIES.map((prop) => (
          <MentionItem key={prop.value} label={prop.value} value={prop.value}>
            <div className="flex flex-col">
              <span className="font-medium">{prop.label}</span>
              <span className="text-muted-foreground text-xs">
                {prop.value}
              </span>
            </div>
          </MentionItem>
        ))}
      </MentionContent>
    </Mention>
  );
};

// Product Input Default Value Action with mention support
export const ActionProductInputDefaultValue = () => {
  const { setData, getData } = useWaraqAction<ProductInputLayerData>();

  const defaultValue = getData("defaultValue", "");

  return (
    <Mention
      trigger="@"
      inputValue={defaultValue}
      onInputValueChange={(value) => setData("defaultValue", value)}
    >
      <MentionInput
        value={defaultValue}
        className="bg-secondary"
        placeholder="Enter default value with @product properties..."
        asChild
      >
        <Textarea />
      </MentionInput>
      <MentionContent>
        {PRODUCT_PROPERTIES.map((prop) => (
          <MentionItem key={prop.value} label={prop.value} value={prop.value}>
            <div className="flex flex-col">
              <span className="font-medium">{prop.label}</span>
              <span className="text-muted-foreground text-xs">
                {prop.value}
              </span>
            </div>
          </MentionItem>
        ))}
      </MentionContent>
    </Mention>
  );
};
