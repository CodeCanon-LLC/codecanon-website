import { useWaraq as useDesigner } from "@codecanon/waraq";
import type { LayerType } from "@codecanon/waraq/lib";
import { IconTextSize } from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { MOD } from "@/lib/symbols";

export interface InputLayerData {
  placeholder?: string;
  multiLine?: boolean;
  defaultValue?: string;
}

// Input layer type - editable text input field
export const InputLayerType: LayerType<InputLayerData> = {
  id: "input",
  name: "Input",
  icon: <IconTextSize size={16} />,
  Component({ layer }) {
    const [focused, setFocued] = useState(false);
    const { updateLayer } = useDesigner();

    const placeholder = layer.data?.placeholder;
    const defaultValue = layer.data?.defaultValue;
    const displayPlaceholder = defaultValue?.trim()
      ? `Default: "${defaultValue}"`
      : placeholder;

    const value = layer.value || "";
    const displayValue = focused ? value : value.trim() || defaultValue;
    const Comp = layer.data?.multiLine ? Textarea : Input;

    return (
      <Comp
        style={layer.contentStyle}
        value={displayValue}
        placeholder={displayPlaceholder}
        onFocus={() => setFocued(true)}
        onBlur={() => setFocued(false)}
        onChange={(e) => updateLayer({ id: layer.id, value: e.target.value })}
        className={cn(
          "text-auto border-none bg-transparent shadow-none ring-gray-300 placeholder:text-black/50 hover:ring-1 dark:bg-transparent",
          layer.data?.multiLine ? "min-h-0 resize-none" : "h-auto",
          !layer.locked && "cursor-move",
          "align-middle",
          !displayValue?.trim() ? "print:hidden" : "print:placeholder:hidden",
        )}
      />
    );
  },
  defaultValues: {
    value: "",
    cssVars: {
      "--width": "300px",
      "--height": "60px",
      "--font-size": "16px",
      "--font-weight": "400",
      "--padding-top": "12px",
      "--padding-bottom": "12px",
      "--padding-left": "16px",
      "--padding-right": "16px",
      "--align-items": "center",
    },
    data: {
      placeholder: "Enter text...",
      multiLine: false,
    },
  },
  keyboardShortcut: {
    description: "Add Input",
    keys: [MOD, "I"],
    action: (context) => context.addLayer("input"),
    category: "Layer",
  },
};
