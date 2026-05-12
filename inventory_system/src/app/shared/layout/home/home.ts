import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {



   stats = [
    {
      title: 'Total Products',
      value: 1250,
      icon: '📦',
      color: 'primary'
    },
    {
      title: 'Low Stock',
      value: 18,
      icon: '⚠️',
      color: 'danger'
    },
    {
      title: 'Suppliers',
      value: 42,
      icon: '🚚',
      color: 'success'
    },
    {
      title: 'Categories',
      value: 16,
      icon: '🗂️',
      color: 'warning'
    }
  ];

  quickMenus = [
    {
      title: 'Products',
      description: 'Manage inventory products',
      icon: '📦',
      route: '/products',
      color: 'primary'
    },
    {
      title: 'Categories',
      description: 'Manage product categories',
      icon: '🗂️',
      route: '/categories',
      color: 'success'
    },
    {
      title: 'Suppliers',
      description: 'Manage suppliers',
      icon: '🚚',
      route: '/suppliers',
      color: 'warning'
    },
    {
      title: 'Customers',
      description: 'Manage customers',
      icon: '👥',
      route: '/customers',
      color: 'info'
    }
  ];

}
