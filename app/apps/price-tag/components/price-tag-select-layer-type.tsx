import type { LayerType } from "@codecanon/waraq/lib";
import { ChevronDown, ListCheckIcon } from "lucide-react";
import { useState } from "react";
import { SelectLayerSelect } from "@/apps/price-tag/components/price-tag-layer-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface SelectLayerData {
  options: string[];
}

// Select layer type - text with dropdown for selecting from options
export const SelectLayerType: LayerType<SelectLayerData> = {
  id: "select",
  name: "Select",
  icon: <ListCheckIcon size={16} />,
  Component({ layer }) {
    const [open, setOpen] = useState(false);

    // Get options from layer data
    const options = layer.data?.options || [];
    const selectedValue = layer.value || options[0] || "Select...";

    return (
      <>
        <span style={layer.contentStyle}>{selectedValue}</span>
        {layer.locked && (
          <div
            className={cn(
              "transition-opactiy absolute top-0 right-0 opacity-0 group-hover/canvas-layer-select:opacity-100 focus:opacity-100",
              open && "opacity-100",
            )}
          >
            <SelectLayerSelect
              asChild
              open={open}
              onOpenChange={setOpen}
              layerId={layer.id}
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronDown />
              </Button>
            </SelectLayerSelect>
          </div>
        )}
      </>
    );
  },
  defaultValues: {
    value: "Option 1",
    cssVars: {
      "--width": "300px",
      "--height": "80px",
      "--font-size": "32px",
      "--font-weight": "500",
    },
    data: {
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  keyboardShortcut: {
    description: "Add Select",
    keys: ["S"],
    action: (context) => context.addLayer("select"),
    category: "Layer",
  },
};
