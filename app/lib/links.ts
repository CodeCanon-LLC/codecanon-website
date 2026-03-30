export const getWaraqLink = () => `/waraq`;

export const getWaraqDemoLink = () => `${getWaraqLink()}/demo`;

export const getWaraqPriceTagLink = () => `${getWaraqLink()}/price-tag`;

export const getWaraqPriceTagDesignLink = (id: string) =>
  `${getWaraqPriceTagLink()}/design/${id}`;

export const getWaraqPriceTagTemplateLink = (id: string) =>
  `${getWaraqPriceTagLink()}/template/${id}`;
