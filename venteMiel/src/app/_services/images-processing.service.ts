import { Injectable, Sanitizer } from '@angular/core';
import { Produit } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImagesProcessingService {

  constructor(private sanitizer:DomSanitizer) { }
  public createImages(product:Produit){
    const productImages:any[]=product.imageProduit
    if (productImages && productImages.length > 0) {
      const productImagesToFileHandle:FileHandle[]=[]
      for (let i = 0; i < productImages.length; i++) {
        const imageFileData = productImages[i];
        const imageBlob=this.dataUriToBlob(imageFileData.picByte,imageFileData.type)
        const imageFile=new File([imageBlob],imageFileData.name,{type:imageFileData.type})
        const finalFileHandle:FileHandle={
          file: imageFile,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        }
        productImagesToFileHandle.push(finalFileHandle)
      }
      product.imageProduit=productImagesToFileHandle;
    }
    
    return product
  }

  public dataUriToBlob(picBytes: string,imageType: any){
    const byteString=window.atob(picBytes)
    const arrayBuffer=new ArrayBuffer(byteString.length)
    const int8array=new Int8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
       int8array[i] = byteString.charCodeAt(i);
      
    }
    const blob =new Blob([int8array],{type:imageType})
    return blob
  }
}
