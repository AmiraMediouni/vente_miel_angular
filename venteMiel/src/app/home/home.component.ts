import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Produit } from '../_model/product.model';
import { ImagesProcessingService } from '../_services/images-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  productDetails : Produit[]=[];
  constructor(private productService :ProductService,private imageProcessingService:ImagesProcessingService, private router:Router){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x:Produit[],i:any)=>x.map((product:Produit)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (response:Produit[])=>{
        console.log(response);
        this.productDetails=response;
        
      },(error:HttpErrorResponse)=>{
        console.log(error);
        
      }
    )
  }
  showProductDetails(productId:any){
    this.router.navigate(['/productViewDetails',{id:productId}])

  }


}
