import { Routes } from '@angular/router';
import { CategoryComponent } from './feature/category/category';
import { SupplierComponent } from './feature/supplier/supplier';
import { CustomerComponent } from './feature/customer/customer';
import { ProductComponent } from './feature/product-componet/product-componet';
import { Home } from './shared/layout/home/home';
import { PurchaseComponent } from './feature/purchase-component/purchase-component';
import { PurchaseHistory } from './feature/purchase-history/purchase-history';


export const routes: Routes = [

    {path: '', component: Home },
    {path: 'category', component: CategoryComponent },
    {path: 'supplier', component: SupplierComponent },
    {path: 'customer', component: CustomerComponent },
    {path: 'product', component: ProductComponent },
    {path: 'purchase', component: PurchaseComponent },
    {path: 'purchase-history', component: PurchaseHistory },
];
