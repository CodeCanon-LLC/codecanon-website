"use client";

import {
  ActionLabel,
  Button,
  ColorInput,
  ColorPicker,
  ColorPickerCompact,
  ColorPreview,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  InputGroup,
  InputGroupAddon,
  InputNumber,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  Tabs as WaraqTabs,
  TabsContent as WaraqTabsContent,
  TabsList as WaraqTabsList,
  TabsTrigger as WaraqTabsTrigger,
} from "@codecanon/waraq/ui";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Pencil,
} from "lucide-react";
import { useState } from "react";

// ── Shared container ────────────────────────────────────────────────────────

export function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex min-h-35 flex-wrap items-center justify-center gap-3 rounded-lg bg-background p-8">
      {children}
    </div>
  );
}

// ── Button ──────────────────────────────────────────────────────────────────

export function ButtonPreview() {
  return (
    <PreviewBox>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </PreviewBox>
  );
}

export function ButtonSizesPreview() {
  return (
    <PreviewBox>
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="default" size="default">
        Default
      </Button>
      <Button variant="default" size="lg">
        Large
      </Button>
      <Button variant="default" size="icon">
        <Pencil size={16} />
      </Button>
    </PreviewBox>
  );
}

// ── Input ───────────────────────────────────────────────────────────────────

export function InputPreview() {
  return (
    <PreviewBox>
      <div className="flex w-64 flex-col gap-2">
        <Input placeholder="Placeholder text" />
        <Input defaultValue="With a value" />
        <Input disabled placeholder="Disabled" />
      </div>
    </PreviewBox>
  );
}

// ── Textarea ────────────────────────────────────────────────────────────────

export function TextareaPreview() {
  return (
    <PreviewBox>
      <div className="w-64">
        <Textarea placeholder="Type something here…" rows={3} />
      </div>
    </PreviewBox>
  );
}

// ── ActionLabel ─────────────────────────────────────────────────────────────

export function ActionLabelPreview() {
  return (
    <PreviewBox>
      <div className="flex w-48 flex-col gap-1.5">
        <ActionLabel htmlFor="preview-name">Your name</ActionLabel>
        <Input id="preview-name" placeholder="John Doe" />
      </div>
    </PreviewBox>
  );
}

// ── InputNumber ─────────────────────────────────────────────────────────────

export function InputNumberPreview() {
  return (
    <PreviewBox>
      <InputNumber
        defaultValue={42}
        suffix="px"
        showControls
        min={0}
        max={1000}
      />
      <InputNumber
        defaultValue={0.75}
        decimalScale={2}
        min={0}
        max={1}
        stepper={0.05}
      />
    </PreviewBox>
  );
}

// ── InputGroup ──────────────────────────────────────────────────────────────

export function InputGroupPreview() {
  return (
    <PreviewBox>
      <div className="flex flex-col gap-2">
        <InputGroup>
          <InputGroupAddon>W</InputGroupAddon>
          <InputNumber defaultValue={300} suffix="px" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>H</InputGroupAddon>
          <InputNumber defaultValue={200} suffix="px" />
        </InputGroup>
      </div>
    </PreviewBox>
  );
}

// ── Slider ──────────────────────────────────────────────────────────────────

export function SliderPreview() {
  const [val, setVal] = useState([40]);
  return (
    <PreviewBox>
      <div className="w-64">
        <Slider value={val} onValueChange={setVal} min={0} max={100} step={1} />
        <p className="mt-2 text-center text-xs text-fd-muted-foreground">
          {val[0]}%
        </p>
      </div>
    </PreviewBox>
  );
}

// ── Select ──────────────────────────────────────────────────────────────────

export function SelectPreview() {
  return (
    <PreviewBox>
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
      </Select>
    </PreviewBox>
  );
}

// ── Tabs ────────────────────────────────────────────────────────────────────

export function TabsPreview() {
  return (
    <PreviewBox>
      <WaraqTabs defaultValue="style" className="w-64">
        <WaraqTabsList>
          <WaraqTabsTrigger value="style">Style</WaraqTabsTrigger>
          <WaraqTabsTrigger value="layout">Layout</WaraqTabsTrigger>
          <WaraqTabsTrigger value="effects">Effects</WaraqTabsTrigger>
        </WaraqTabsList>
        <WaraqTabsContent
          value="style"
          className="p-2 text-xs text-fd-muted-foreground"
        >
          Style panel content
        </WaraqTabsContent>
        <WaraqTabsContent
          value="layout"
          className="p-2 text-xs text-fd-muted-foreground"
        >
          Layout panel content
        </WaraqTabsContent>
        <WaraqTabsContent
          value="effects"
          className="p-2 text-xs text-fd-muted-foreground"
        >
          Effects panel content
        </WaraqTabsContent>
      </WaraqTabs>
    </PreviewBox>
  );
}

// ── ToggleGroup ─────────────────────────────────────────────────────────────

export function ToggleGroupPreview() {
  return (
    <PreviewBox>
      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify">
          <AlignJustify size={14} />
        </ToggleGroupItem>
      </ToggleGroup>
    </PreviewBox>
  );
}

// ── Separator ───────────────────────────────────────────────────────────────

export function SeparatorPreview() {
  return (
    <PreviewBox>
      <div className="flex w-48 flex-col gap-3 text-xs text-fd-muted-foreground">
        <span>Above the separator</span>
        <Separator />
        <span>Below the separator</span>
      </div>
      <div className="flex h-12 items-center gap-3 text-xs text-fd-muted-foreground">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </PreviewBox>
  );
}

// ── ColorPicker ─────────────────────────────────────────────────────────────

export function ColorPickerPreview() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <PreviewBox>
      <ColorPicker value={color} onChange={setColor} showInput showPreview />
    </PreviewBox>
  );
}

export function ColorPickerCompactPreview() {
  const [color, setColor] = useState("#f59e0b");
  return (
    <PreviewBox>
      <div className="flex flex-col gap-3">
        <ActionLabel>Picker</ActionLabel>
        <ColorPickerCompact value={color} onChange={setColor} />
        <ActionLabel>Preview</ActionLabel>
        <ColorPreview value={color} />
        <ActionLabel>Input</ActionLabel>
        <ColorInput value={color} onChange={setColor} />
      </div>
    </PreviewBox>
  );
}

// ── Dialog ──────────────────────────────────────────────────────────────────

export function DialogPreview() {
  return (
    <PreviewBox>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PreviewBox>
  );
}

// ── Popover ─────────────────────────────────────────────────────────────────

export function PopoverPreview() {
  return (
    <PreviewBox>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3 text-sm">
          <p className="font-medium">Settings</p>
          <p className="mt-1 text-xs text-fd-muted-foreground">
            Manage your layer settings and preferences here.
          </p>
        </PopoverContent>
      </Popover>
    </PreviewBox>
  );
}
