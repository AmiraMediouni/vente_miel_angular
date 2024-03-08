import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Produit } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails:Produit[]=[]
  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    commandeQuantiteList: []
  }
  constructor(private activatedRoute:ActivatedRoute, private productService:ProductService,private router:Router){}
  ngOnInit(): void {
    this.productDetails= this.activatedRoute.snapshot.data['productDetails']
    this.productDetails.forEach(
      x=>this.orderDetails.commandeQuantiteList.push(
        {produitId:x.id,quantite:1}
      )
    )
    console.log(this.productDetails);
    console.log(this.orderDetails);
    
    
  }
  public placeOrder(orderForm:NgForm){
    console.log("orderDetails")
    console.log(this.orderDetails);
    console.log("productDetails")
    console.log(this.productDetails);
    
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp)=>{
               
        console.log(resp);
        console.log(this.orderDetails);
        
    //    orderForm.reset()        
      },
      (err)=>{
        console.log(err);
        
      }
    )
   // this.router.navigate(["/orderConfirm"])
  }
  getQuantityForProduct(id:any){
    const filteredProduct=this.orderDetails.commandeQuantiteList.filter(
      (productQuantity)=>productQuantity.produitId===id
          )
          return filteredProduct[0].quantite
  }

  getCalculatedTotal(id:number,prix:number){
    return this.getQuantityForProduct(id)*prix;

  }
  onQuantityChanged(quantite:any,id:any){
    this.orderDetails.commandeQuantiteList.filter(
      (orderProduct)=>orderProduct.produitId===id
          )[0].quantite=quantite
  }

  getCalculatedAllTotal(){
    let allTotal=0
     this.orderDetails.commandeQuantiteList.forEach(
      (productQuantity)=>{
       const price=this.productDetails.filter(
          (product)=>product.id===productQuantity.produitId
              )[0].prix
       allTotal=allTotal+price*productQuantity.quantite 
      }
    )
    return allTotal
  }

}
