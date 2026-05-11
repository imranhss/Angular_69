import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { ProductModel, Category, Supplier } from '../../shared/models';
import { ProductService } from '../../core/services/product-service';
import { CategoryService } from '../../core/services/category-service';
import { SupplierService } from '../../core/services/supplier-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-componet.html',
  styleUrl: './product-componet.css',
})
export class ProductComponent implements OnInit {

  products: ProductModel[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  filteredProducts: ProductModel[] = [];

  searchText: string = '';
  previewImage: string | null = null;

  selectedFile: File | null = null;

  selectedProduct: ProductModel = this.getEmpty();
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadSuppliers();
  }

  getEmpty(): ProductModel {
    return {
      name: '',
      code: '',
      categoryId: '',
      supplierId: '',
      purchasePrice: 0,
      salePrice: 0,
      stockQty: 0,
      alertQty: 0,
      image: '',
    };
  }

  // 📦 LOAD
  loadProducts() {
    this.productService.getAll().subscribe(res => {
      this.products = res;
      this.filteredProducts = res;
      this.cdr.markForCheck();
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.cdr.markForCheck();
    });
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(res => {
      this.suppliers = res;
      this.cdr.markForCheck();
    });
  }

  // 🔍 SEARCH
  onSearch() {
    const val = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(val) ||
      p.code.toLowerCase().includes(val)
    );
  }

  // 📸 IMAGE PREVIEW
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
      this.selectedProduct.image = this.previewImage!;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  // 💾 SAVE
  save() {
    if (this.isEditMode && this.selectedProduct.id) {
      this.productService.update(this.selectedProduct.id, this.selectedProduct)
        .subscribe(() => {
          this.reset();
          this.loadProducts();
        });
    } else {
      this.productService.create(this.selectedProduct)
        .subscribe(() => {
          this.reset();
          this.loadProducts();
        });
    }
  }

  // ✏️ EDIT
  edit(p: ProductModel) {
    this.selectedProduct = { ...p };
    this.previewImage = p.image;
    this.isEditMode = true;
  }

  // ❌ DELETE
  delete(id: string) {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  reset() {
    this.selectedProduct = this.getEmpty();
    this.previewImage = null;
    this.selectedFile = null;
    this.isEditMode = false;
  }
}