import { Component, OnInit } from '@angular/core';
import { Produit } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
  isNewProduct=true;
  produit:Produit={
    nom: '',
    description: '',
    quantite: 0,
    prix: 0,
    date_ajout: '',
    texture: '',
    type: '',
    imageProduit: [],
    id:0
  }
  constructor(private productService:ProductService, private sanitizer:DomSanitizer, private activtedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.produit=this.activtedRoute.snapshot.data['product']
    if(this.produit && this.produit.id){this.isNewProduct=false}
  }
  addProduct(productForm:NgForm){
    const productFormData=this.prepareFormData(this.produit)
    console.log(this.produit);
    this.productService.addProduct(productFormData).subscribe(
      (response:Produit)=>{
        console.log(response);
        productForm.reset()
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        
      }
    )
    
  }

  prepareFormData(produit:Produit):FormData{
    const formData=new FormData();
    formData.append(
      'produit',
      new Blob([JSON.stringify(produit)],{type:'application/json'})
    )
    for(var i =0;i<produit.imageProduit.length;i++){
      formData.append(
        'imageFile',
        produit.imageProduit[i].file,
        produit.imageProduit[i].file.name
      )
    }
    return formData;
  }
  onFileSelected(event:any){
    console.log(event);
    if(event.target.files){
      const file=event.target.files[0];
      const fileHandle:FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.produit.imageProduit.push(fileHandle)
    }
    
  }

  removeImage(i : number){
    this.produit.imageProduit.splice(i,1)
  }

}
