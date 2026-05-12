import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductModel, Purchase, Supplier } from '../../shared/models';
import { PurchaseService } from '../../core/services/purchase.service';
import { SupplierService } from '../../core/services/supplier-service';
import { ProductService } from '../../core/services/product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-history.html',
  styleUrl: './purchase-history.css',
})
export class PurchaseHistory {

  purchases: Purchase[] = [];
  suppliers: Supplier[] = [];
  products: ProductModel[] = [];


  searchInvoice: string = '';
  searchSupplier: string = '';
  fromDate: string = '';
  toDate: string = '';

  filteredPurchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPurchases();
    this.loadSuppliers();
    this.loadProducts();
  }

  // 📥 LOAD PURCHASES
  loadPurchases() {
    this.purchaseService.getAll().subscribe(res => {
      this.purchases = res;
      this.filteredPurchases = res;
      this.cdr.markForCheck();
    });
  }

  // 📥 LOAD SUPPLIERS
  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(res => {
      this.suppliers = res;
      this.cdr.markForCheck();
    });
  }

  // 📥 LOAD PRODUCTS
  loadProducts() {
    this.productService.getAll().subscribe(res => {
      this.products = res;
      this.cdr.markForCheck();
    });
  }

  // 🔍 GET SUPPLIER NAME
  getSupplierName(id: string): string {
    return this.suppliers.find(s => s.id === id)?.name || '';
  }

  // 🔍 GET PRODUCT NAME
  getProductName(id: string): string {
    return this.products.find(p => p.id === id)?.name || '';
  }

  // ❌ DELETE PURCHASE
  deletePurchase(id: string) {

    if (confirm('Are you sure to delete this purchase?')) {

      this.purchaseService.delete(id).subscribe(() => {

        this.loadPurchases();

      });
    }
  }

filterPurchases() {

  this.filteredPurchases = this.purchases.filter(p => {

    // SUPPLIER NAME
    const supplierName = this.getSupplierName(
      p.supplierId
    ).toLowerCase();

    // INVOICE
    const invoice = p.invoiceNo.toLowerCase();

    // PURCHASE DATE
    const purchaseDate = new Date(p.purchaseDate);

    // SEARCH CONDITIONS
    const matchSupplier =
      supplierName.includes(
        this.searchSupplier.toLowerCase()
      );

    const matchInvoice =
      invoice.includes(
        this.searchInvoice.toLowerCase()
      );

    // DATE RANGE
    let matchDate = true;

    if (this.fromDate) {
      matchDate =
        matchDate &&
        purchaseDate >= new Date(this.fromDate);
    }

    if (this.toDate) {

      const to = new Date(this.toDate);

      // INCLUDE FULL DAY
      to.setHours(23, 59, 59, 999);

      matchDate =
        matchDate &&
        purchaseDate <= to;
    }

    return (
      matchSupplier &&
      matchInvoice &&
      matchDate
    );

  });

}


}
