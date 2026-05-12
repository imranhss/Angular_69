import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductModel, Purchase, PurchaseItem, Supplier } from '../../shared/models';
import { SupplierService } from '../../core/services/supplier-service';
import { ProductService } from '../../core/services/product-service';
import { PurchaseService } from '../../core/services/purchase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-component.html',
  styleUrl: './purchase-component.css',
})
export class PurchaseComponent implements OnInit{



 suppliers: Supplier[] = [];
  products: ProductModel[] = [];

  purchases: Purchase[] = [];

  purchase: Purchase = this.getEmptyPurchase();

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
    this.loadPurchases();
  }

  getEmptyPurchase(): Purchase {
    return {
      supplierId: '',
      purchaseDate: '',
      invoiceNo: '',
      grandTotal: 0,
      paidAmount: 0,
      dueAmount: 0,
      items: [],
    };
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(res => {
      this.suppliers = res;
      this.cdr.markForCheck();
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe(res => {
      this.products = res;
      this.cdr.markForCheck();
    });
  }

  loadPurchases() {
    this.purchaseService.getAll().subscribe(res => {
      this.purchases = res;
      this.cdr.markForCheck();
    });
  }

  // ➕ ADD PRODUCT ROW
  addItem() {
    const item: PurchaseItem = {
      productId: '',
      qty: 1,
      purchasePrice: 0,
      total: 0,
    };

    this.purchase.items.push(item);
  }

  // ❌ REMOVE ITEM
  removeItem(index: number) {
    this.purchase.items.splice(index, 1);
    this.calculateTotal();
  }

  // 🧮 CALCULATE
  calculateItem(item: PurchaseItem) {
    item.total = item.qty * item.purchasePrice;
    this.calculateTotal();
  }

  calculateTotal() {
    this.purchase.grandTotal = this.purchase.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    this.purchase.dueAmount =
      this.purchase.grandTotal - this.purchase.paidAmount;
  }

  // 💾 SAVE PURCHASE
  savePurchase() {

    // AUTO STOCK INCREASE
    this.purchase.items.forEach(item => {

      const product = this.products.find(
        p => p.id === item.productId
      );

      if (product) {

        product.stockQty += item.qty;

        this.productService.update(product.id!, product)
          .subscribe();
      }
    });

    this.purchaseService.create(this.purchase)
      .subscribe(() => {

        alert('Purchase Saved');

        this.purchase = this.getEmptyPurchase();

        this.loadPurchases();
      });
  }


}
