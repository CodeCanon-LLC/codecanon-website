import {
  DEFAULT_FRAME_BACKGROUND_COLOR,
  DEFAULT_FRAME_SIZE,
} from "@codecanon/waraq/lib";
import { simulateDelay } from "@/lib/mock-api-utils";
import { PRICE_TAG_DESIGN_MOCKS, PRICE_TAG_TEMPLATE_MOCKS } from "@/lib/mocks";
import { uuid } from "@/lib/uuid";
import type { PriceTag } from "@/types/price-tag";

export async function getPriceTagTemplates(): Promise<PriceTag[]> {
  await simulateDelay();
  return PRICE_TAG_TEMPLATE_MOCKS;
}

export async function getPriceTagDesigns(): Promise<PriceTag[]> {
  await simulateDelay();
  return PRICE_TAG_DESIGN_MOCKS;
}

export async function getPriceTagTemplate(
  id: string,
): Promise<PriceTag | null> {
  await simulateDelay();
  return PRICE_TAG_TEMPLATE_MOCKS.find((c) => c.id === id) || null;
}

export async function getPriceTagDesign(id: string): Promise<PriceTag | null> {
  await simulateDelay();
  return PRICE_TAG_DESIGN_MOCKS.find((c) => c.id === id) || null;
}

export async function createPriceTagTemplate(id = uuid()): Promise<string> {
  await simulateDelay();
  PRICE_TAG_TEMPLATE_MOCKS.push({
    id,
    name: "New Template",
    frameBackgroundColor: DEFAULT_FRAME_BACKGROUND_COLOR,
    frameSize: DEFAULT_FRAME_SIZE,
    layers: [],
  });
  return id;
}

export async function createPriceTagDesign(
  template: PriceTag,
): Promise<string> {
  await simulateDelay();
  const id = uuid();
  PRICE_TAG_DESIGN_MOCKS.push({
    ...template,
    id,
    name: `New ${template.name}`,
  });
  return id;
}
