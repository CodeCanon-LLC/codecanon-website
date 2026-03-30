export interface Product {
  id: string;
  name: string;
  brand_sku: string;
  derived: {
    retail_price: number;
  };
  primary_image: string;
}
