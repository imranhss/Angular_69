// category.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Category } from '../../shared/models';
import { CategoryService } from '../../core/services/category-service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  category: Category = {
    categoryName: '',
    description: '',
  };

  isEditMode = false;

  constructor(private categoryService: CategoryService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load all categories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Save or Update
  saveCategory(): void {

    // CREATE
    if (!this.isEditMode) {
      const newCategory = {
        categoryName: this.category.categoryName,
        description: this.category.description,
      };

      this.categoryService.createCategory(newCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
        },
      });

    } 
    
    // UPDATE
    else {
      if (this.category.id) {
        this.categoryService
          .updateCategory(this.category.id, this.category)
          .subscribe({
            next: () => {
              this.loadCategories();
              this.resetForm();
            },
            error: (err) => {
              console.error(err);
            },
          });
      }
    }
  }

  // Edit category
  editCategory(category: Category): void {
    this.category = { ...category };
    this.isEditMode = true;
  }

  // Delete category
  deleteCategory(id?: string): void {
    if (!id) return;

    if (confirm('Are you sure to delete?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.category = {
      categoryName: '',
      description: '',
    };

    this.isEditMode = false;
  }
}