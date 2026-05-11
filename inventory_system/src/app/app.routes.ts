import { Routes } from '@angular/router';
import { CategoryComponent } from './feature/category/category';
import { SupplierComponent } from './feature/supplier/supplier';
import { CustomerComponent } from './feature/customer/customer';
import { ProductComponent } from './feature/product-componet/product-componet';


export const routes: Routes = [

    {path: 'category', component: CategoryComponent },
    {path: 'supplier', component: SupplierComponent },
    {path: 'customer', component: CustomerComponent },
    {path: 'product', component: ProductComponent },
];
