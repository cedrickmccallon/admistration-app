import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  /**/
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '', component: LayoutComponent,
    children: [
      {path:'dashboard',component:DashboardComponent},
      { path: 'products',  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
      { path: 'orders',    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
