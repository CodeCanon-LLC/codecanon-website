import { PriceTagTemplate } from "@/apps/price-tag/price-tag-template";

export function meta() {
  return [{ title: "Waraq Price Tag — CodeCanon" }];
}

export default function Page() {
  return (
    <div className="size-full flex-1">
      <PriceTagTemplate />
    </div>
  );
}
