// supplier.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Supplier } from '../../shared/models';
import { SupplierService } from '../../core/services/supplier-service';


@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];

  supplier: Supplier = {
    name: '',
    company: '',
    phone: '',
    email: '',
    address: '',
  };

  isEditMode = false;

  constructor(private supplierService: SupplierService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  // Load Suppliers
  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Save or Update
  saveSupplier(): void {

    // CREATE
    if (!this.isEditMode) {

      const newSupplier = {
        name: this.supplier.name,
        company: this.supplier.company,
        phone: this.supplier.phone,
        email: this.supplier.email,
        address: this.supplier.address,
      };

      this.supplierService.createSupplier(newSupplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
        },
      });

    }

    // UPDATE
    else {

      if (this.supplier.id) {

        this.supplierService
          .updateSupplier(this.supplier.id, this.supplier)
          .subscribe({
            next: () => {
              this.loadSuppliers();
              this.resetForm();
            },
            error: (err) => {
              console.error(err);
            },
          });

      }
    }
  }

  // Edit Supplier
  editSupplier(supplier: Supplier): void {
    this.supplier = { ...supplier };
    this.isEditMode = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Delete Supplier
  deleteSupplier(id?: string): void {

    if (!id) return;

    if (confirm('Are you sure to delete this supplier?')) {

      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.loadSuppliers();
        },
        error: (err) => {
          console.error(err);
        },
      });

    }
  }

  // Reset Form
  resetForm(): void {
    this.supplier = {
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
    };

    this.isEditMode = false;
  }
}