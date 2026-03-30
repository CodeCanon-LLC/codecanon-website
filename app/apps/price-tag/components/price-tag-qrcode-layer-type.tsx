import type { LayerType } from "@codecanon/waraq/lib";
import { IconQrcode } from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";

export interface QRCodeLayerData {
  qrLevel?: "L" | "M" | "Q" | "H";
  qrFgColor?: string;
}

// QR Code layer type - displays a QR code
export const QRCodeLayerType: LayerType<QRCodeLayerData> = {
  id: "qrcode",
  name: "QR Code",
  keepRatio: true,
  icon: <IconQrcode size={16} />,
  render: (layer) => {
    const value = layer.value || "https://example.com";
    const qrLevel = layer.data?.qrLevel || "M";
    const qrFgColor = layer.data?.qrFgColor || "#000000";

    return (
      <QRCodeSVG
        bgColor="transparent"
        value={value}
        level={qrLevel}
        fgColor={qrFgColor}
        style={{
          ...layer.contentStyle,
          width: "100%",
          height: "100%",
        }}
      />
    );
  },
  defaultValues: {
    value: "https://example.com",
    cssVars: {
      "--width": "200px",
      "--height": "200px",
      "--background-color": "#ffffff",
    },
    data: {
      qrLevel: "M",
      qrFgColor: "#000000",
    },
  },
  keyboardShortcut: {
    description: "Add QR Code",
    keys: ["Q"],
    action: (context) => context.addLayer("qrcode"),
    category: "Layer",
  },
};
