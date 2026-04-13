import { usePresetPicker } from "@codecanon/next-presets";
import { Palette } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MOD, SHIFT } from "@/lib/symbols";
import { KbdGroup, Kbd } from "@/components/ui/kbd";

function PresetPickerButton() {
  const { toggleOpen } = usePresetPicker();

  useHotkeys("mod+shift+p", toggleOpen, { enableOnFormTags: true });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="fixed size-12 bottom-4 right-4 rounded-full z-50"
          onClick={toggleOpen}
        >
          <Palette className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Choose Preset{" "}
        <KbdGroup className="">
          <Kbd>{MOD}</Kbd>
          <Kbd>{SHIFT}</Kbd>
          <Kbd>{"P"}</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}

export { PresetPickerButton };
