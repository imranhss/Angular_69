import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer-service';
import { Customer } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  searchText: string = '';
  previewImage: string | null = null;

  selectedCustomer: Customer = this.getEmptyCustomer();
  isEditMode: boolean = false;

  selectedFile: File | null = null;

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  getEmptyCustomer(): Customer {
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      image: '',
    };
  }

  // 📥 LOAD
  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = data;
      this.cdr.markForCheck();
    });
  }

  // 🔍 SEARCH
  onSearch() {
    const value = this.searchText.toLowerCase().trim();

    if (!value) {
      this.filteredCustomers = this.customers;
      return;
    }

    this.filteredCustomers = this.customers.filter((c) =>
      c.name.toLowerCase().includes(value) ||
      c.email.toLowerCase().includes(value) ||
      c.phone.toLowerCase().includes(value)
    );
  }

  // 📸 IMAGE UPLOAD → BASE64
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      // 👇 THIS IS THE KEY FIX
      this.previewImage = base64;
      this.selectedCustomer.image = base64;
      this.cdr.markForCheck();
    };

    reader.readAsDataURL(file);
  }

  // 💾 SAVE
  saveCustomer() {
    if (this.isEditMode && this.selectedCustomer.id) {
      this.customerService
        .updateCustomer(this.selectedCustomer.id, this.selectedCustomer)
        .subscribe(() => {
          this.resetForm();
          this.loadCustomers();
        });
    } else {
      this.customerService.createCustomer(this.selectedCustomer).subscribe(() => {
        this.resetForm();
        this.loadCustomers();
      });
    }
  }

  // ✏️ EDIT
  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.isEditMode = true;
  }

  // ❌ DELETE
  deleteCustomer(id: string) {
    if (confirm('Are you sure to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  // 🔄 RESET
  resetForm() {
    this.selectedCustomer = this.getEmptyCustomer();
    this.isEditMode = false;
    this.selectedFile = null;
  }
}