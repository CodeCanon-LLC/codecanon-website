export const getDocsLink = () => `/docs`;

export const getDocsNuskaLink = () => `${getDocsLink()}/nuska`;

export const getDocsWaraqLink = () => `${getDocsLink()}/waraq`;

export const getDocsNextPresetsLink = () => `${getDocsLink()}/next-presets`;

export const getNextPresetsLink = () => `/next-presets`;

export const getNextPresetsDemoLink = () => `${getNextPresetsLink()}/demo`;

export const getNuskaLink = () => `/nuska`;

export const getNuskaDemoLink = () => `${getNuskaLink()}/demo`;

export const getWaraqLink = () => `/waraq`;

export const getWaraqDemoLink = () => `${getWaraqLink()}/demo`;

export const getWaraqPerformanceDemoLink = () =>
  `${getWaraqLink()}/performance`;

export const getWaraqPriceTagLink = () => `${getWaraqLink()}/price-tag`;

export const getWaraqPriceTagDesignLink = (id: string) =>
  `${getWaraqPriceTagLink()}/design/${id}`;

export const getWaraqPriceTagTemplateLink = (id: string) =>
  `${getWaraqPriceTagLink()}/template/${id}`;
