import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Produit } from '../_model/product.model';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ImagesProcessingService } from './images-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Produit[]> {

  constructor(private productService:ProductService, private imageProcessingService:ImagesProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Produit[] | Observable<Produit[]> | Promise<Produit[]> {
    const id=route.paramMap.get("id");
    const isSingleProductCheckout=route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Produit[],i)=>x.map((product:Produit) =>this.imageProcessingService.createImages(product))
    )
    )
  }
}
