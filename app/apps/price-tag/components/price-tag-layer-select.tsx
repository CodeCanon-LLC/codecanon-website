import { useWaraq } from "@codecanon/waraq";
import { IconCheck } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import type { ProductLayerData } from "@/apps/price-tag/components/price-tag-product-layer-type";
import type { SelectLayerData } from "@/apps/price-tag/components/price-tag-select-layer-type";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { combineFuncs } from "@/lib/combine-funcs";

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Premium Coffee Beans",
    sku: "COFFEE-001",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300",
  },
  {
    id: "2",
    name: "Organic Green Tea",
    sku: "TEA-002",
    price: 18.5,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300",
  },
  {
    id: "3",
    name: "Dark Chocolate Bar",
    sku: "CHOC-003",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300",
  },
];

export function ProductLayerSelect({
  layerId,
  open,
  onOpenChange,
  ...props
}: {
  layerId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & React.ComponentProps<typeof PopoverTrigger>) {
  const { getLayer, updateLayer } = useWaraq();
  const layer = useMemo(
    () => getLayer<ProductLayerData>(layerId),
    [layerId, getLayer],
  );
  const selectedProducts = useMemo(
    () => layer?.data?.products.map((p) => p.id) || [],
    [layer?.data?.products],
  );
  const maxSelectCount = layer?.data?.maxSelectCount;

  const handleToggleProduct = (productId: string) => {
    const isCurrentlySelected = selectedProducts.includes(productId);

    // If deselecting, allow it
    if (isCurrentlySelected) {
      const nextSelectedProducts = selectedProducts.filter(
        (id) => id !== productId,
      );
      const products = MOCK_PRODUCTS.filter((p) =>
        nextSelectedProducts.includes(p.id),
      );
      updateLayer({ id: layerId, data: { products } });
      return;
    }

    // If selecting, check if max limit is reached
    if (maxSelectCount === 1) {
      const products = MOCK_PRODUCTS.filter((p) => p.id === productId);
      // Update layer directly
      updateLayer({ id: layerId, data: { products } });
      return;
    }
    if (maxSelectCount && selectedProducts.length >= maxSelectCount) {
      // Max limit reached, don't allow selection
      return;
    }

    // Add the new product
    const nextSelectedProducts = [...selectedProducts, productId];
    const products = MOCK_PRODUCTS.filter((p) =>
      nextSelectedProducts.includes(p.id),
    );

    // Update layer directly
    updateLayer({ id: layerId, data: { products } });
  };

  const isMaxReached =
    maxSelectCount && maxSelectCount !== 1
      ? selectedProducts.length >= maxSelectCount
      : false;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger {...props} />
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {maxSelectCount && (
                <div className="text-muted-foreground px-2 pb-1.5 text-xs">
                  Selected {selectedProducts.length} of {maxSelectCount}{" "}
                  products
                </div>
              )}
              {MOCK_PRODUCTS.map((product) => {
                const isSelected = selectedProducts.includes(product.id);
                const isDisabled = !isSelected && isMaxReached;

                return (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => handleToggleProduct(product.id)}
                    disabled={isDisabled}
                    className={cn(
                      isDisabled && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <IconCheck
                      className={cn(
                        "mr-2 size-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div className="flex flex-1 items-center gap-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-10 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {product.sku} • ${product.price}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function SelectLayerSelect({
  layerId,
  open: openProp,
  onOpenChange: setOpenProp,
  ...props
}: {
  layerId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & React.ComponentProps<typeof PopoverTrigger>) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = combineFuncs(setOpenProp, setOpenState);

  const { updateLayer, getLayer } = useWaraq();
  const layer = getLayer<SelectLayerData>(layerId);
  const options = layer?.data?.options || [];
  const currentValue = layer?.value || options[0];

  const handleSelect = (value: string) => {
    updateLayer({ id: layerId, value });
    setOpen?.(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger {...props} />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option: string) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelect(option)}
                >
                  <IconCheck
                    className={cn(
                      "mr-2 size-4",
                      currentValue === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
