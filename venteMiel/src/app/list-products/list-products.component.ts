import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Produit } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesComponent } from '../show-product-images/show-product-images.component';
import { ImagesProcessingService } from '../_services/images-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
 productDetails : Produit[]=[];
  displayedColumns: string[] = ['Id', 'Nom', 'Description', 'Prix','Quantité','Date_Ajout','Type','Texture','Images', 'Edit', 'Delete'];
   constructor(private productService:ProductService, public imagesDialog: MatDialog, private imageProcessingService:ImagesProcessingService, private router:Router){}
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
  public deleteProduct(id:any){
    console.log(id);
    this.productService.deleteProduct(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.getAllProducts()
                
      },(error:HttpErrorResponse)=>{
        console.log(error);
        
      }
    )  

  }

  showImages(product:Produit){
    console.log(product);
    
      this.imagesDialog.open(ShowProductImagesComponent,{
      data:{
        images:product.imageProduit
      },
      height:'500px', width : '500px'})
    
  }

  editProductDetails(productId:any){
    this.router.navigate(['/addNewProduct',{id:productId}])
    
  }

}
