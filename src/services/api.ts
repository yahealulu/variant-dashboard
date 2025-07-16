import axios from 'axios';

const BASE_URL = 'https://setalkel.amjadshbib.com/api';
const IMAGE_BASE_URL = 'https://setalkel.amjadshbib.com/public/';
const TOKEN = '61|ZWYJB42oCUQKbkF3CGJlTnofeq6S4nSM2xiqpYf1deb36ca7';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface Category {
  id: number;
  name_translations: {
    ar: string;
    en: string;
  };
  image: string;
  country_origin_id: any;
  products_count: number;
  products: Product[];
  is_hidden: boolean;
}

export interface Product {
  id: number;
  product_code: string;
  name_translations: {
    en: string;
    ar: string;
  };
  description_translations: {
    ar: string;
    en: string;
  };
  category_id: number;
  material_property: string;
  product_category: string;
  weight_unit: string;
  barcode: string;
  image: string;
  in_stock: boolean;
  is_hidden: boolean;
  is_new: boolean;
}

export interface Variant {
  id: number;
  product_id: number;
  size: string;
  gross_weight: string;
  net_weight: string;
  tare_weight: string;
  standard_weight: string;
  free_quantity: number;
  packaging: string;
  box_dimensions: string;
  box_packing: string;
  in_stock: boolean;
  is_hidden: boolean;
  is_new: boolean;
  image: string;
  barcode: string;
  user_rating: any;
  user_price: {
    piece_price: number;
    box_price: number;
  };
}

export const apiService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get('/categories');
      return response.data.data.filter((category: Category) => category.products_count > 0);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getProductVariants(productId: number): Promise<Variant[]> {
    try {
      const response = await api.get(`/product-with-variants/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product variants:', error);
      throw error;
    }
  },

  async uploadVariantImage(productId: number, variantId: number, imageFile: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('image', imageFile);

      const response = await api.post(`/products/${productId}/variants/${variantId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  getImageUrl(imagePath: string): string {
    if (!imagePath || imagePath === 'null') return '';
    return `${IMAGE_BASE_URL}${imagePath}`;
  }
};
