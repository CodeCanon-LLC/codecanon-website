import { DEFAULT_LAYER_TYPES } from "@codecanon/waraq/lib";
import type { LayerType } from "@codecanon/waraq/lib";
import { InputLayerType } from "@/apps/price-tag/components/price-tag-input-layer-type";
import { ProductLayerType } from "@/apps/price-tag/components/price-tag-product-layer-type";
import { QRCodeLayerType } from "@/apps/price-tag/components/price-tag-qrcode-layer-type";
import { SelectLayerType } from "@/apps/price-tag/components/price-tag-select-layer-type";
import { TodaysDateLayerType } from "@/apps/price-tag/components/price-tag-todaysdate-layer-type";
import { UserLayerType } from "@/apps/price-tag/components/price-tag-user-layer-type";

export const CANVAS_LAYER_TYPES: LayerType[] = [
  ...DEFAULT_LAYER_TYPES,
  TodaysDateLayerType,
  SelectLayerType,
  InputLayerType,
  QRCodeLayerType,
  ProductLayerType,
  UserLayerType,
];
