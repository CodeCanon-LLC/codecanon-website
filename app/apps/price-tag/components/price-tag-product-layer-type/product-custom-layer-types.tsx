import type { CSSVars, Layer, LayerType } from "@codecanon/waraq/lib";
import { FrameLayer, ImageLayer, TextLayer } from "@codecanon/waraq/lib";
import {
  IconCurrencyDollar,
  IconHash,
  IconPhoto,
  IconTag,
} from "@tabler/icons-react";
import {
  type InputLayerData,
  InputLayerType,
} from "@/apps/price-tag/components/price-tag-input-layer-type";
import type { ProductDisplay as Product } from "@/apps/price-tag/components/price-tag-product-layer-type";
import { replaceProductProperties } from "@/apps/price-tag/components/price-tag-product-layer-type/product-custom-utils";
import {
  type QRCodeLayerData,
  QRCodeLayerType,
} from "@/apps/price-tag/components/price-tag-qrcode-layer-type";

export interface ProductPropertyLayerData {
  product?: Product;
}

// Product Name layer type - displays product name from selected product
export const ProductNameLayerType: LayerType<ProductPropertyLayerData> = {
  id: "product-name",
  name: "Product Name",
  icon: <IconTag size={16} />,
  render: (layer) => {
    const product = layer.data?.product;
    return (
      <span style={layer.contentStyle}>{product?.name || "Product Name"}</span>
    );
  },
  defaultValues: {
    cssVars: {
      "--width": "450px",
      "--height": "41px",
      "--font-size": "24px",
      "--font-weight": "600",
    },
  },
};

// Product SKU layer type - displays product SKU
export const ProductSKULayerType: LayerType<ProductPropertyLayerData> = {
  id: "product-sku",
  name: "Product SKU",
  icon: <IconHash size={16} />,
  render: (layer) => {
    const product = layer.data?.product;
    return <span style={layer.contentStyle}>{product?.sku || "SKU-000"}</span>;
  },
  defaultValues: {
    cssVars: {
      "--width": "450px",
      "--height": "20px",
      "--font-size": "14px",
      "--font-weight": "400",
      "--color": "#9ca3af",
    },
  },
};

// Product Price layer type - displays product price
export const ProductPriceLayerType: LayerType<ProductPropertyLayerData> = {
  id: "product-price",
  name: "Product Price",
  icon: <IconCurrencyDollar size={16} />,
  render: (layer) => {
    const product = layer.data?.product;
    const price = product?.price ? `$${product.price.toFixed(2)}` : "$0.00";
    return <span style={layer.contentStyle}>{price}</span>;
  },
  defaultValues: {
    cssVars: {
      "--width": "161px",
      "--height": "60px",
      "--font-size": "28px",
      "--font-weight": "700",
      "--color": "#10b981",
    },
  },
};

// Product Image layer type - displays product image
export const ProductImageLayerType: LayerType<ProductPropertyLayerData> = {
  id: "product-image",
  name: "Product Image",
  icon: <IconPhoto size={16} />,
  keepRatio: true,
  render: (layer) => {
    const product = layer.data?.product;

    if (!product?.image) {
      return (
        <div
          style={{
            ...layer.contentStyle,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6",
          }}
        >
          <IconPhoto size={48} style={{ color: "#9ca3af" }} />
        </div>
      );
    }

    return (
      <img
        src={product.image}
        alt={product.name}
        style={{
          ...layer.contentStyle,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  },
  defaultValues: {
    cssVars: {
      "--width": "100px",
      "--height": "100px",
    },
  },
};

// Product QR Code layer type - QR code with product property support
export interface ProductQRCodeLayerData extends QRCodeLayerData {
  product?: Product;
}

export const ProductQRCodeLayerType: LayerType<ProductQRCodeLayerData> = {
  ...QRCodeLayerType,
  id: "product-qrcode",
  name: "Product QR Code",
  render(layer) {
    const product = layer.data?.product;
    const template = layer.value || "www.google.com/search?q=@product.sku";
    const value = replaceProductProperties(template, product);
    const layerWithDefault: Layer = {
      ...layer,
      value,
    };

    return QRCodeLayerType.render?.(layerWithDefault);
  },
  defaultValues: {
    ...QRCodeLayerType.defaultValues,
    value: "www.google.com/search?q=@product.sku",
    cssVars: {
      ...QRCodeLayerType.defaultValues?.cssVars,
      "--width": "100px",
      "--height": "100px",
    } as CSSVars,
  },
  keyboardShortcut: undefined,
};

// Product Input layer type - Input with product property support in default value
export interface ProductInputLayerData extends InputLayerData {
  product?: Product;
}

export const ProductInputLayerType: LayerType<ProductInputLayerData> = {
  ...InputLayerType,
  id: "product-input",
  name: "Product Input",
  Component: ({ layer }) => {
    const product = layer.data?.product;
    const defaultValueTemplate = layer.data?.defaultValue;
    const defaultValue = replaceProductProperties(
      defaultValueTemplate || "",
      product,
    );
    const Comp = InputLayerType.Component as React.FC<{
      layer: Layer<ProductInputLayerData>;
    }>;
    const layerWithDefault: Layer = {
      ...layer,
      data: {
        ...layer.data,
        defaultValue,
      },
    };

    return <Comp layer={layerWithDefault} />;
  },
  defaultValues: {
    ...InputLayerType.defaultValues,
    cssVars: {
      ...InputLayerType.defaultValues?.cssVars,
      "--width": "200px",
      "--height": "41px",
    } as CSSVars,
  },
  keyboardShortcut: undefined,
};

export const ProdcutFrameLayer: LayerType = {
  ...FrameLayer,
  defaultValues: {
    ...FrameLayer.defaultValues,
    cssVars: {
      ...FrameLayer.defaultValues?.cssVars,
      "--width": "100px",
      "--height": "100px",
    },
  },
};

export const ProductTextLayer: LayerType = {
  ...TextLayer,
  defaultValues: {
    ...TextLayer.defaultValues,
    cssVars: {
      ...TextLayer.defaultValues?.cssVars,
      "--width": "200px",
      "--height": "41px",
      "--font-size": "24px",
    },
  },
};

export const ProductImageLayer: LayerType = {
  ...ImageLayer,
  defaultValues: {
    ...ImageLayer.defaultValues,
    cssVars: {
      ...ImageLayer.defaultValues?.cssVars,
      "--width": "100px",
      "--height": "100px",
    },
  },
};

export const ProductBaseQRCodeLayerType: LayerType<QRCodeLayerData> = {
  ...QRCodeLayerType,
  defaultValues: {
    ...QRCodeLayerType.defaultValues,
    cssVars: {
      ...QRCodeLayerType.defaultValues?.cssVars,
      "--width": "100px",
      "--height": "100px",
    } as CSSVars,
  },
};
export const ProductBaseInputLayerType: LayerType<InputLayerData> = {
  ...InputLayerType,
  defaultValues: {
    ...InputLayerType.defaultValues,
    cssVars: {
      ...InputLayerType.defaultValues?.cssVars,
      "--width": "200px",
    } as CSSVars,
  },
};

export const PRODUCT_CUSTOM_LAYER_TYPES: LayerType[] = [
  ProductNameLayerType,
  ProductSKULayerType,
  ProductPriceLayerType,
  ProductImageLayerType,
  ProductQRCodeLayerType,
  ProductInputLayerType,
  ProdcutFrameLayer,
  ProductTextLayer,
  ProductImageLayer,
  ProductBaseQRCodeLayerType,
  ProductBaseInputLayerType,
];
