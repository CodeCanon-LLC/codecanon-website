import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { CanvasDesigner } from "@/apps/price-tag/components/price-tag-designer";
import { getCanvasTemplate } from "@/apps/price-tag/lib/api";
import { uuid } from "@/lib/uuid";

export function CanvasTemplate() {
  const { id: canvasTemplateId = uuid() } = useParams<{
    id: string;
  }>();

  const { data: canvas, isPending } = useQuery({
    queryKey: ["canvas-template", canvasTemplateId],
    queryFn: () =>
      canvasTemplateId ? getCanvasTemplate(canvasTemplateId) : null,
  });

  return (
    <CanvasDesigner
      canvasId={canvasTemplateId}
      canvas={canvas}
      loading={isPending}
    />
  );
}
