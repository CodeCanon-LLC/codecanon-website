"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { useEffect, useState } from "react";
import {
  ActionLabelPreview,
  ButtonPreview,
  ButtonSizesPreview,
  ColorPickerCompactPreview,
  ColorPickerPreview,
  DialogPreview,
  InputGroupPreview,
  InputNumberPreview,
  InputPreview,
  PopoverPreview,
  SelectPreview,
  SeparatorPreview,
  SliderPreview,
  TabsPreview,
  TextareaPreview,
  ToggleGroupPreview,
} from "./previews";

// ── Registry ────────────────────────────────────────────────────────────────

const registry: Record<string, { component: React.FC; code: string }> = {
  Button: {
    component: ButtonPreview,
    code: `import { Button } from "@codecanon/waraq/ui"

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
  },
  ButtonSizes: {
    component: ButtonSizesPreview,
    code: `import { Button } from "@codecanon/waraq/ui"
import { Pencil } from "lucide-react"

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Pencil size={16} /></Button>`,
  },
  Input: {
    component: InputPreview,
    code: `import { Input } from "@codecanon/waraq/ui"

<Input placeholder="Placeholder text" />
<Input defaultValue="With a value" />
<Input disabled placeholder="Disabled" />`,
  },
  Textarea: {
    component: TextareaPreview,
    code: `import { Textarea } from "@codecanon/waraq/ui"

<Textarea placeholder="Type something here…" rows={3} />`,
  },
  ActionLabel: {
    component: ActionLabelPreview,
    code: `import { ActionLabel, Input } from "@codecanon/waraq/ui"

<ActionLabel htmlFor="name">Your name</ActionLabel>
<Input id="name" placeholder="John Doe" />`,
  },
  InputNumber: {
    component: InputNumberPreview,
    code: `import { InputNumber } from "@codecanon/waraq/ui"

<InputNumber defaultValue={42} suffix="px" showControls min={0} max={1000} />
<InputNumber defaultValue={0.75} decimalScale={2} min={0} max={1} stepper={0.05} />`,
  },
  InputGroup: {
    component: InputGroupPreview,
    code: `import { InputGroup, InputGroupAddon, InputNumber } from "@codecanon/waraq/ui"

<InputGroup>
  <InputGroupAddon>W</InputGroupAddon>
  <InputNumber defaultValue={300} suffix="px" />
</InputGroup>
<InputGroup>
  <InputGroupAddon>H</InputGroupAddon>
  <InputNumber defaultValue={200} suffix="px" />
</InputGroup>`,
  },
  Slider: {
    component: SliderPreview,
    code: `import { Slider } from "@codecanon/waraq/ui"

<Slider defaultValue={[40]} min={0} max={100} step={1} />`,
  },
  Select: {
    component: SelectPreview,
    code: `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@codecanon/waraq/ui"

<Select defaultValue="solid">
  <SelectTrigger className="w-40">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="solid">Solid</SelectItem>
    <SelectItem value="dashed">Dashed</SelectItem>
    <SelectItem value="dotted">Dotted</SelectItem>
    <SelectItem value="double">Double</SelectItem>
  </SelectContent>
</Select>`,
  },
  Tabs: {
    component: TabsPreview,
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@codecanon/waraq/ui"

<Tabs defaultValue="style">
  <TabsList>
    <TabsTrigger value="style">Style</TabsTrigger>
    <TabsTrigger value="layout">Layout</TabsTrigger>
    <TabsTrigger value="effects">Effects</TabsTrigger>
  </TabsList>
  <TabsContent value="style">Style panel content</TabsContent>
  <TabsContent value="layout">Layout panel content</TabsContent>
  <TabsContent value="effects">Effects panel content</TabsContent>
</Tabs>`,
  },
  ToggleGroup: {
    component: ToggleGroupPreview,
    code: `import { ToggleGroup, ToggleGroupItem } from "@codecanon/waraq/ui"
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"

<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left"><AlignLeft size={14} /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter size={14} /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight size={14} /></ToggleGroupItem>
  <ToggleGroupItem value="justify"><AlignJustify size={14} /></ToggleGroupItem>
</ToggleGroup>`,
  },
  Separator: {
    component: SeparatorPreview,
    code: `import { Separator } from "@codecanon/waraq/ui"

{/* Horizontal */}
<Separator />

{/* Vertical */}
<Separator orientation="vertical" />`,
  },
  ColorPicker: {
    component: ColorPickerPreview,
    code: `import { ColorPicker } from "@codecanon/waraq/ui"

const [color, setColor] = useState("#3b82f6")

<ColorPicker
  value={color}
  onChange={setColor}
  showInput
  showPreview
/>`,
  },
  ColorPickerCompact: {
    component: ColorPickerCompactPreview,
    code: `import {
  ColorPickerCompact,
  ColorPreview,
  ColorInput,
} from "@codecanon/waraq/ui"

const [color, setColor] = useState("#f59e0b")

{/* Compact trigger — opens full picker in a popover */}
<ColorPickerCompact value={color} onChange={setColor} />

{/* Swatch only */}
<ColorPreview value={color} />

{/* Hex input only */}
<ColorInput value={color} onChange={setColor} />`,
  },
  Dialog: {
    component: DialogPreview,
    code: `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, Button,
} from "@codecanon/waraq/ui"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  Popover: {
    component: PopoverPreview,
    code: `import {
  Popover, PopoverTrigger, PopoverContent,
  Button,
} from "@codecanon/waraq/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-56 p-3 text-sm">
    Popover content goes here.
  </PopoverContent>
</Popover>`,
  },
};

// ── ComponentPreview ─────────────────────────────────────────────────────────

interface ComponentPreviewProps {
  name: string;
}

export default function ComponentPreview({ name }: ComponentPreviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const item = registry[name];

  if (!item) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-fd-muted-foreground">
        Preview not found: <code>{name}</code>
      </div>
    );
  }

  const Preview = item.component;

  useEffect(() => setIsMounted(true), []);

  return (
    <Tabs items={["Preview", "Code"]} className="my-4">
      <Tab value="Preview">
        {isMounted ? <Preview /> : <div className="min-h-35" />}
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={item.code} />
      </Tab>
    </Tabs>
  );
}
