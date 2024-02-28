import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Produit } from '../_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImagesProcessingService } from './images-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Produit>{

  constructor(private productService:ProductService, private imageProcessingService:ImagesProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produit> {
    const id = route.paramMap.get("id")
    if (id) {
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p=>this.imageProcessingService.createImages(p))
      )

    } else {
        return of(this.getProductDetails());
    }
  }
  getProductDetails() {
    return {
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
  }
}
