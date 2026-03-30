import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { CanvasDesigner } from "@/apps/price-tag/components/price-tag-designer";
import { getCanvasDesign } from "@/apps/price-tag/lib/api";
import { uuid } from "@/lib/uuid";

export function CanvasDesign() {
  const { canvasDesignId = uuid() } = useParams<{ canvasDesignId: string }>();

  const { data: canvas, isPending } = useQuery({
    queryKey: ["canvas-item", canvasDesignId],
    queryFn: () => (canvasDesignId ? getCanvasDesign(canvasDesignId) : null),
  });

  return (
    <CanvasDesigner
      initialTool={canvas?.layers.length ? "select" : "move"}
      canvasId={canvasDesignId}
      canvas={canvas}
      loading={isPending}
    />
  );
}
