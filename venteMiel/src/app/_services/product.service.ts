import { Injectable } from '@angular/core';
import { Produit } from '../_model/product.model';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public addProduct(produit:FormData){
    return this.http.post<Produit>("http://localhost:8080/products/addNewProduct",produit)

  }
  public getAllProducts(){
    return this.http.get<Produit[]>("http://localhost:8080/products/getAllProducts")

  }
  public deleteProduct(productId:number){
    return this.http.delete("http://localhost:8080/products/deleteProduct/"+productId)

  }
  public getProductDetails(isSingleProductCheckout: any, productId:any){
    return this.http.get<Produit[]>("http://localhost:8080/products/getProductDetails/"+isSingleProductCheckout+"/"+productId)

  }

  public getProductDetailsById(productId:any){
    return this.http.get<Produit>("http://localhost:8080/products/getProductById/"+productId)

  }

  public placeOrder(orderDetails:OrderDetails){
    return this.http.post("http://localhost:8080/orders/placeOrder",orderDetails)

  }
}
