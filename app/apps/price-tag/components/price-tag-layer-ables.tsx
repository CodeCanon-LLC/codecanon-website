import { useWaraqDocument } from "@codecanon/waraq";
import { createAble, DEFAULT_ABLES } from "@codecanon/waraq/lib";

import { IconChevronDown, IconEdit } from "@tabler/icons-react";
import { Palette } from "lucide-react";
import { useId, useState } from "react";
import type { InputLayerData } from "@/apps/price-tag/components/price-tag-input-layer-type";
import { ActionProductCustomDesign } from "@/apps/price-tag/components/price-tag-layer-actions";
import {
  ProductLayerSelect,
  SelectLayerSelect,
} from "@/apps/price-tag/components/price-tag-layer-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

// Select Layer Combobox Able
export const SelectLayerComboboxAble = createAble({
  name: "selectLayerCombobox",
  layerType: "select",
  Component({ layerId }) {
    if (!layerId) return null;

    return (
      <SelectLayerSelect layerId={layerId} asChild>
        <Button
          size="icon-sm"
          className="shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <IconChevronDown />
        </Button>
      </SelectLayerSelect>
    );
  },
});

// Product Layer Combobox Able
export const ProductLayerComboboxAble = createAble({
  name: "productLayerCombobox",
  layerType: "product",
  Component({ layerId }) {
    if (!layerId) return null;

    return (
      <div className="flex flex-col gap-2">
        <ProductLayerSelect layerId={layerId} asChild>
          <Button
            size="icon-sm"
            className="shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <IconChevronDown />
          </Button>
        </ProductLayerSelect>
        <ActionProductCustomDesign>
          <Button size="icon-sm">
            <Palette />
          </Button>
        </ActionProductCustomDesign>
      </div>
    );
  },
});

// Input Layer Edit Able
export const InputLayerEditAble = createAble({
  name: "inputLayerEdit",
  layerType: "input",
  Component({ layerId }) {
    if (!layerId) return null;

    const id = useId();
    const { updateLayer, getLayer } = useWaraqDocument();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const layer = getLayer<InputLayerData>(layerId);
    const currentValue = layer?.value || "";
    const placeholder = layer?.data?.placeholder || "Enter text...";
    const Comp = layer?.data?.multiLine ? Textarea : Input;

    const handleOpen = () => {
      setInputValue(currentValue);
      setOpen(true);
    };

    const handleSave = () => {
      updateLayer({ id: layerId, value: inputValue });
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!layer?.data?.multiLine && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        setOpen(false);
        setInputValue(currentValue);
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon-sm"
            className="shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            <IconEdit />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]" align="start">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={id}>
                Edit Input Value
              </label>
              <Comp
                id={id}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setInputValue(currentValue);
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
});

export const PRICE_TAG_ABLES = [
  ...DEFAULT_ABLES,
  SelectLayerComboboxAble,
  InputLayerEditAble,
  ProductLayerComboboxAble,
];
