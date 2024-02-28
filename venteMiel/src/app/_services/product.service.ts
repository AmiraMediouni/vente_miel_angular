import { Injectable } from '@angular/core';
import { Produit } from '../_model/product.model';
import { HttpClient } from '@angular/common/http';

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

  public getProductDetailsById(productId:any){
    return this.http.get<Produit>("http://localhost:8080/products/getProductById/"+productId)

  }
}
