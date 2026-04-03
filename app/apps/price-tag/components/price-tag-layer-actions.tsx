import { useWaraqAction } from "@codecanon/waraq";
import {
  createWaraqData as createWaraqData,
  type WaraqData,
  parseLayerCssVar,
} from "@codecanon/waraq/lib";
import {
  Action,
  ActionControls,
  ActionLabel,
  Button,
  ButtonText,
  ColorPicker,
  ColorPreview,
  Combobox,
  type ComboboxOption,
  Input,
  Popover,
  PopoverActions,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Separator,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
} from "@codecanon/waraq/ui";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import {
  Check,
  GripVerticalIcon,
  TextCursorInputIcon,
  TextSelect,
  X,
} from "lucide-react";
import { type PropsWithChildren, useState } from "react";
import type { InputLayerData } from "@/apps/price-tag/components/price-tag-input-layer-type";
import type {
  ProductLayerData,
  ProductLayerDisplayStyle,
} from "@/apps/price-tag/components/price-tag-product-layer-type";
import { ProductCustomDesignerDialog } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-designer-dialog";
import type { QRCodeLayerData } from "@/apps/price-tag/components/price-tag-qrcode-layer-type";
import type { SelectLayerData } from "@/apps/price-tag/components/price-tag-select-layer-type";
import type {
  UserLayerData,
  UserLayerDisplayStyle,
  UserLayerSize,
} from "@/apps/price-tag/components/price-tag-user-layer-type";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { cn } from "@/lib/cn";

// Date Format Action for TodaysDate layer type
export const ActionDateFormat = () => {
  const { layer, setLayer } = useWaraqAction();

  const dateFormat = layer?.value || "MM/dd/yyyy";

  const commonFormats: ComboboxOption[] = [
    {
      value: "MM/dd/yyyy",
      label: "12/04/2025",
      keywords: ["american", "12/04/2025"],
    },
    {
      value: "dd/MM/yyyy",
      label: "04/12/2025",
      keywords: ["european", "04/12/2025"],
    },
    {
      value: "yyyy-MM-dd",
      label: "2025-12-04",
      keywords: ["iso", "2025-12-04"],
    },
    {
      value: "MMMM dd, yyyy",
      label: "December 04, 2025",
      keywords: ["full", "December 04, 2025"],
    },
    {
      value: "MMM dd, yyyy",
      label: "Dec 04, 2025",
      keywords: ["short", "Dec 04, 2025"],
    },
    {
      value: "EEEE, MMMM dd, yyyy",
      label: "Wednesday, December 04, 2025",
      keywords: ["full", "Wednesday, December 04, 2025"],
    },
    {
      value: "EEE, MMM dd, yyyy",
      label: "Wed, Dec 04, 2025",
      keywords: ["short", "Wed, Dec 04, 2025"],
    },
    {
      value: "dd MMMM yyyy",
      label: "04 December 2025",
      keywords: ["day", "04 December 2025"],
    },
    {
      value: "M/d/yy",
      label: "12/4/25",
      keywords: ["short", "12/4/25"],
    },
  ];

  return (
    <Action>
      <ActionLabel>Format</ActionLabel>
      <ActionControls>
        <Combobox
          value={dateFormat}
          onValueChange={(value) => setLayer({ value })}
          options={commonFormats}
        />
      </ActionControls>
    </Action>
  );
};

// Select Options Action for Select layer type
export const ActionSelectOptions = () => {
  const { getData, setData } = useWaraqAction<SelectLayerData>();

  // Parse options from layer data
  const [options, setOptions] = useState(getData("options", []));
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    const updated = [...options, newOption.trim()];
    setOptions(updated);
    setData("options", updated);
    setNewOption("");
  };

  const handleRemoveOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    setData("options", updated);
  };

  const handleUpdateOptions = (options: string[]) => {
    setOptions(options);
    setData("options", options);
  };

  return (
    <Action orientation="vertical">
      <ActionControls className="flex-col items-stretch gap-2">
        {/* List of options */}
        <Sortable value={options} onValueChange={handleUpdateOptions}>
          <SortableContent className="flex flex-col gap-1">
            {options.map((option, index) => (
              <SortableItem
                key={index}
                value={option.trim() || index}
                className="flex items-center gap-2"
              >
                <Input
                  value={option}
                  className="flex-1"
                  onChange={(e) => {
                    const updated = [...options];
                    updated[index] = e.target.value;
                    setOptions(updated);
                    setData("options", updated);
                  }}
                />
                <SortableItemHandle>
                  <GripVerticalIcon size={16} />
                </SortableItemHandle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                >
                  <IconTrash size={16} />
                </Button>
              </SortableItem>
            ))}
          </SortableContent>
        </Sortable>

        {/* Add new option */}
        <div className="flex gap-2">
          <Input
            placeholder="New option..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOption();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleAddOption} size="icon" variant="outline">
            <IconPlus size={16} />
          </Button>
        </div>
      </ActionControls>
    </Action>
  );
};

export type ProductDisplayStyleOption = Omit<ComboboxOption, "value"> & {
  value: ProductLayerDisplayStyle;
  description: string;
};

// Product Max Select Count Action
export const ActionProductMaxSelectCount = () => {
  const { getData, setData } = useWaraqAction<ProductLayerData>();

  const maxSelectCount = getData("maxSelectCount", 0);

  return (
    <Action>
      <ActionLabel>Max Select</ActionLabel>
      <ActionControls>
        <Input
          type="number"
          min={0}
          placeholder="Unlimited"
          value={maxSelectCount || ""}
          onChange={(e) => {
            const value = e.target.value;
            setData("maxSelectCount", value ? Number(value) : undefined);
          }}
        />
      </ActionControls>
    </Action>
  );
};

// Product Display Style Action
export const ActionProductDisplayStyle = () => {
  const { getData, setData } = useWaraqAction<ProductLayerData>();

  const displayStyle = getData("displayStyle", "card");

  const styles: ProductDisplayStyleOption[] = [
    {
      value: "grid",
      label: "Grid",
      description: "Products in a grid layout",
    },
    {
      value: "table",
      label: "Table",
      description: "Grid with header row",
    },
    {
      value: "card",
      label: "Card",
      description: "3-column card layout (image, details, price)",
    },
    {
      value: "list",
      label: "List",
      description: "3-column list layout (image, details, price)",
    },
    {
      value: "custom",
      label: "Custom",
      description: "Design your own custom product layout",
    },
  ];

  return (
    <Action>
      <ActionLabel>Style</ActionLabel>
      <ActionControls>
        <Combobox
          options={styles}
          value={displayStyle}
          onValueChange={(value) =>
            setData("displayStyle", value as ProductLayerDisplayStyle)
          }
          renderOption={(opt) => {
            const option = opt as ProductDisplayStyleOption;

            return (
              <>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    displayStyle === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-muted-foreground text-xs">
                    {option.description}
                  </div>
                </div>
              </>
            );
          }}
        />
      </ActionControls>
    </Action>
  );
};

// Product Custom Design Action
export const ActionProductCustomDesign = ({ children }: PropsWithChildren) => {
  const { layer, getData, setData } = useWaraqAction<ProductLayerData>();

  if (layer?.data?.displayStyle !== "custom") return null;

  const layerWidth = layer ? parseLayerCssVar(layer, "--width", 0) : 0;
  const layerHeight = layer ? parseLayerCssVar(layer, "--height", 0) : 0;

  const layerPaddingLeft = layer
    ? parseLayerCssVar(layer, "--padding-left", 0)
    : 0;
  const layerPaddingRight = layer
    ? parseLayerCssVar(layer, "--padding-right", 0)
    : 0;
  const layerPaddingTop = layer
    ? parseLayerCssVar(layer, "--padding-top", 0)
    : 0;
  const layerPaddingBottom = layer
    ? parseLayerCssVar(layer, "--padding-bottom", 0)
    : 0;

  const maxWidth = layerWidth - layerPaddingLeft - layerPaddingRight;
  const maxHeight = layerHeight - layerPaddingTop - layerPaddingBottom;

  const customDesign = getData(
    "customDesign",
    createWaraqData({
      frameSize: {
        width: maxWidth,
        height: Math.min(maxHeight, 100),
      },
    }),
  );

  const handleDataChange = (data: WaraqData) => {
    setData("customDesign", data);
  };

  return (
    <Action orientation="vertical">
      <ActionControls className="flex-col items-stretch">
        <ProductCustomDesignerDialog
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          data={customDesign}
          onDataChange={handleDataChange}
        >
          {children}
        </ProductCustomDesignerDialog>
      </ActionControls>
    </Action>
  );
};

export const ActionInputPlaceholder = () => {
  const { setData, getData } = useWaraqAction<InputLayerData>();

  const placeholder = getData("placeholder", "Enter text...");

  return (
    <Action>
      <ActionLabel>Placeholder</ActionLabel>
      <ActionControls>
        <Input
          placeholder="Enter placeholder..."
          value={placeholder}
          onChange={(e) => setData("placeholder", e.target.value)}
        />
      </ActionControls>
    </Action>
  );
};

export const ActionInputDefaultValue = () => {
  const { setData, getData } = useWaraqAction<InputLayerData>();

  const defaultValue = getData("defaultValue", "");
  const multiLine = getData("multiLine", false);

  if (multiLine) {
    return (
      <Action orientation="vertical">
        <ActionLabel>Default</ActionLabel>
        <ActionControls>
          <Textarea
            placeholder="Enter default value..."
            value={defaultValue}
            onChange={(e) => setData("defaultValue", e.target.value)}
          />
        </ActionControls>
      </Action>
    );
  }

  return (
    <Action>
      <ActionLabel>Default</ActionLabel>
      <ActionControls>
        <Input
          placeholder="Enter default value..."
          value={defaultValue}
          onChange={(e) => setData("defaultValue", e.target.value)}
        />
      </ActionControls>
    </Action>
  );
};

export const ActionInputMode = () => {
  const { setData, getData } = useWaraqAction<InputLayerData>();

  const multiLine = getData("multiLine", false);

  return (
    <Action>
      <ActionLabel>{multiLine ? "Multi Line" : "Single Line"}</ActionLabel>
      <ActionControls>
        <ToggleGroup
          type="single"
          value={String(multiLine)}
          onValueChange={(value) => setData("multiLine", value === "true")}
        >
          <ToggleGroupItem value="false" title="Single Line">
            <TextCursorInputIcon className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="true" title="Multi Line">
            <TextSelect className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ActionControls>
    </Action>
  );
};

// QR Code Value Action
export const ActionQRCodeValue = () => {
  const { layer, setLayer } = useWaraqAction();

  const value = layer?.value;

  return (
    <Textarea
      value={value}
      onChange={(e) => setLayer({ value: e.target.value })}
      placeholder="Enter URL or text..."
    />
  );
};

// QR Code Error Correction Level Action
export const ActionQRCodeLevel = () => {
  const { getData, setData } = useWaraqAction<QRCodeLayerData>();

  const qrLevel = getData("qrLevel", "M");

  const levels: ComboboxOption[] = [
    {
      value: "L",
      label: "Low (7%)",
      keywords: ["low", "7", "minimum", "basic"],
    },
    {
      value: "M",
      label: "Medium (15%)",
      keywords: ["medium", "15", "standard", "default", "normal"],
    },
    {
      value: "Q",
      label: "Quartile (25%)",
      keywords: ["quartile", "25", "high", "better"],
    },
    {
      value: "H",
      label: "High (30%)",
      keywords: ["high", "30", "maximum", "best", "highest"],
    },
  ];

  return (
    <Action>
      <ActionLabel>Error</ActionLabel>
      <ActionControls>
        <Combobox
          value={qrLevel}
          onValueChange={(value) =>
            setData("qrLevel", value as "L" | "M" | "Q" | "H")
          }
          options={levels}
        />
      </ActionControls>
    </Action>
  );
};

// QR Code Foreground Color Action
export const ActionQRCodeFgColor = () => {
  const { getData, setData } = useWaraqAction<QRCodeLayerData>();

  const qrFgColor = getData("qrFgColor", "#000000");
  const hasColor = qrFgColor !== "";

  return (
    <Popover>
      <Action orientation="horizontal">
        <ActionLabel>Foreground</ActionLabel>
        <ActionControls>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              className="data-[empty=true]:text-muted-foreground w-fit flex-1 justify-start uppercase data-[empty=true]:capitalize"
              data-empty={!hasColor}
            >
              <ButtonText active={hasColor}>
                {hasColor ? qrFgColor : "Add..."}
              </ButtonText>
              {hasColor && <ColorPreview value={qrFgColor} />}
            </Button>
          </PopoverTrigger>
          <Button
            size="icon"
            disabled={!hasColor}
            onClick={() => setData("qrFgColor", "")}
          >
            <X className="size-3.5" />
          </Button>
        </ActionControls>
      </Action>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Foreground Color</PopoverTitle>
        </PopoverHeader>
        <Separator />
        <PopoverActions>
          <ColorPicker
            value={qrFgColor || "#000000"}
            onChange={(color) => setData("qrFgColor", color)}
          />
        </PopoverActions>
      </PopoverContent>
    </Popover>
  );
};

interface UserDisplayStyleOption extends ComboboxOption {
  description: string;
}

// User Display Style Action
export const ActionUserDisplayStyle = () => {
  const { getData, setData } = useWaraqAction<UserLayerData>();

  const displayStyle = getData("displayStyle", "profile");

  const styles: UserDisplayStyleOption[] = [
    {
      value: "profile",
      label: "Profile",
      description: "Avatar with name and email",
      keywords: [
        "profile",
        "full",
        "complete",
        "avatar",
        "name",
        "email",
        "card",
        "user",
      ],
    },
    {
      value: "name",
      label: "Name",
      description: "User's full name only",
      keywords: ["name", "fullname", "full", "text", "display"],
    },
    {
      value: "email",
      label: "Email",
      description: "User's email address only",
      keywords: ["email", "address", "contact", "mail", "text"],
    },
    {
      value: "avatar",
      label: "Avatar",
      description: "User's avatar only",
      keywords: ["avatar", "image", "picture", "photo", "icon", "profile pic"],
    },
  ];

  return (
    <Action>
      <ActionLabel>Style</ActionLabel>
      <ActionControls>
        <Combobox
          value={displayStyle}
          onValueChange={(value) =>
            setData("displayStyle", value as UserLayerDisplayStyle)
          }
          options={styles}
          renderOption={(opt) => (
            <>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  displayStyle === opt.value ? "opacity-100" : "opacity-0",
                )}
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="font-medium">{opt.label}</div>
                {opt.description && (
                  <div className="text-muted-foreground text-xs">
                    {opt.description}
                  </div>
                )}
              </div>
            </>
          )}
        />
      </ActionControls>
    </Action>
  );
};

// User Size Action
export const ActionUserSize = () => {
  const { getData, setData } = useWaraqAction<UserLayerData>();

  const size = getData("size", "default");

  const sizes: ComboboxOption[] = [
    {
      value: "x-small",
      label: "X-Small",
      keywords: ["xs", "extra", "small", "tiny", "smallest", "mini"],
    },
    {
      value: "small",
      label: "Small",
      keywords: ["sm", "small", "compact", "little"],
    },
    {
      value: "default",
      label: "Default",
      keywords: ["default", "medium", "md", "normal", "standard"],
    },
    {
      value: "large",
      label: "Large",
      keywords: ["lg", "large", "big", "bigger"],
    },
    {
      value: "x-large",
      label: "X-Large",
      keywords: ["xl", "extra", "large", "huge", "largest", "biggest"],
    },
  ];

  return (
    <Action>
      <ActionLabel>Size</ActionLabel>
      <ActionControls>
        <Combobox
          value={size}
          onValueChange={(value) => setData("size", value as UserLayerSize)}
          options={sizes}
        />
      </ActionControls>
    </Action>
  );
};
