import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductResolveService } from './_services/product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['CLIENT']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']},
    resolve:{
      product:ProductResolveService  
    }
},
  { path: 'listProducts', component: ListProductsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'productViewDetailsComponent', component: ProductViewDetailsComponent,
  resolve:{
    product:ProductResolveService  
  } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
