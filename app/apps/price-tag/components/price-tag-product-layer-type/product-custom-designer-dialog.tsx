import type { WaraqData } from "@codecanon/waraq/lib";
import { createWaraqData } from "@codecanon/waraq/lib";
import { DialogClose } from "@codecanon/waraq/ui";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { ProductCustomDesigner } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-designer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCustomDesignerDialogProps {
  data?: WaraqData;
  onDataChange: (data: WaraqData) => void;
  children?: React.ReactNode;
  maxWidth: number;
  maxHeight: number;
}

export function ProductCustomDesignerDialog({
  data = createWaraqData(),
  onDataChange,
  children,
  maxWidth,
  maxHeight,
}: ProductCustomDesignerDialogProps) {
  const [localData, setLocalData] = useState<WaraqData>(data);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Save changes when closing
      onDataChange(localData);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <IconPencil size={16} />
            Edit Custom Layout
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-screen min-h-screen max-w-screen min-w-screen flex-col gap-0 rounded-none p-0">
        <DialogHeader className="border-b p-6 pb-4">
          <DialogTitle>Design Product Layout</DialogTitle>
          <DialogDescription>
            Design how your products will be displayed. Add product properties
            (name, price, image, SKU) and other layers to create a custom
            layout. This layout will be used for all selected products.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[calc(100vh-160px)]">
          <ProductCustomDesigner
            data={localData}
            onDataChange={setLocalData}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
          />
        </div>
        <DialogFooter className="border-t p-4">
          <div className="container mx-auto flex justify-end">
            <DialogClose asChild>
              <Button>Close Product Editor</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
