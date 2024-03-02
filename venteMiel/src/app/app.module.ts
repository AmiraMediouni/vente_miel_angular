import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { ListProductsComponent } from './list-products/list-products.component';
import {MatTableModule} from '@angular/material/table';
import { ShowProductImagesComponent } from './show-product-images/show-product-images.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterUserComponent } from './register-user/register-user.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    HeaderAdminComponent,
    AddNewProductComponent,
    ListProductsComponent,
    ShowProductImagesComponent,
    BuyProductComponent,
    ProductViewDetailsComponent,
    OrderConfirmationComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule, MatTableModule,MatDialogModule
  ],
  providers: [ AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
