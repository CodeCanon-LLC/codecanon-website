import {
  DEFAULT_FRAME_BACKGROUND_COLOR,
  DEFAULT_FRAME_SIZE,
} from "@codecanon/waraq/lib";
import {
  CANVAS_DESIGN_MOCKS,
  CANVAS_TEMPLATE_MOCKS,
} from "@/apps/price-tag/lib/mocks";
import { simulateDelay } from "@/lib/mock-api-utils";
import { uuid } from "@/lib/uuid";
import type { Canvas } from "@/types/canvas";

export async function getCanvasTemplates(): Promise<Canvas[]> {
  await simulateDelay();
  return CANVAS_TEMPLATE_MOCKS;
}

export async function getCanvasDesigns(): Promise<Canvas[]> {
  await simulateDelay();
  return CANVAS_DESIGN_MOCKS;
}

export async function getCanvasTemplate(id: string): Promise<Canvas | null> {
  await simulateDelay();
  return CANVAS_TEMPLATE_MOCKS.find((c) => c.id === id) || null;
}

export async function getCanvasDesign(id: string): Promise<Canvas | null> {
  await simulateDelay();
  return CANVAS_DESIGN_MOCKS.find((c) => c.id === id) || null;
}

export async function createCanvasTemplate(id = uuid()): Promise<string> {
  await simulateDelay();
  CANVAS_TEMPLATE_MOCKS.push({
    id,
    name: "New Template",
    frameBackgroundColor: DEFAULT_FRAME_BACKGROUND_COLOR,
    frameSize: DEFAULT_FRAME_SIZE,
    layers: [],
  });
  return id;
}

export async function createCanvasDesign(template: Canvas): Promise<string> {
  await simulateDelay();
  const id = uuid();
  CANVAS_DESIGN_MOCKS.push({
    ...template,
    id,
    name: `New ${template.name}`,
  });
  return id;
}
