export interface ProductModel {
 id?: string;
 name: string;
 code: string;
 categoryId: string;
 supplierId: string;
 purchasePrice: number;
 salePrice: number;
 stockQty: number;
 alertQty: number;
 image: string;
}



export interface Category {
  id?: string;
  categoryName: string;
  description: string;
}



export interface Supplier {
  id?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
}



export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}



