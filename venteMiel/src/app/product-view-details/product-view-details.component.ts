import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  selectedProductIndex=0;
  product!: Produit;
  constructor(private activtedRoute:ActivatedRoute, private router:Router,private productService:ProductService){}
  ngOnInit(): void {
    this.product=this.activtedRoute.snapshot.data['product']
    
    
  }
  changeIndex(i:any){
    this.selectedProductIndex=i;
  }
  buyProduct(productId:any){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,id:productId
    }])
  }
  addToCart(productId:number){

    console.log(this.product);
    this.productService.addToCart(productId).subscribe(
      (response)=>{
        console.log(response);
        
      },(error)=>{
        console.log(error);
        
      }
    );
  }
}
