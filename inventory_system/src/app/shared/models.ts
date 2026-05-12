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


export interface Purchase {
  id?: string;
  supplierId: string;
  purchaseDate: string;
  invoiceNo: string;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  items: PurchaseItem[];
}


export interface PurchaseItem {
  productId: string;
  qty: number;
  purchasePrice: number;
  total: number;
}





