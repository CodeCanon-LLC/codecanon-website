import { usePresetPicker } from "@codecanon/next-presets";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PresetPickerButton() {
  const { toggleOpen } = usePresetPicker();

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
      <TooltipContent>Choose Preset</TooltipContent>
    </Tooltip>
  );
}

export { PresetPickerButton };
