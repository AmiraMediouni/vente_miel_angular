import { Injectable } from '@angular/core';
import { Produit } from '../_model/product.model';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

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
  
  public addToCart(productId:number){
    return this.http.get("http://localhost:8080/addToCart/"+productId)

  }

  public getCartDetails(){
    return this.http.get("http://localhost:8080/getCartDetails")

  }
  public deleteCartItems(cartId:number){
    return this.http.delete("http://localhost:8080/deleteCartItem/"+cartId)

  }

  public getMyOrders():Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:8080/orders/getOrderDetails")

  }

  public getAllOrdersForAdmin(status:string):Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:8080/orders/getAllOrderDetails/"+status)

  }

  public markAsDelivered(orderId:number){
    return this.http.get("http://localhost:8080/orders/markOrderAsDelivered/"+orderId)
  }
}
