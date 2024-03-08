import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public verif:boolean=false;
  displayedColumns: string[] = ['Nom', 'Description', 'Prix','Type','Texture','Action'];
  cartDetails:any[]=[]
  constructor(private productService:ProductService, private router:Router){}
  ngOnInit(): void {
    console.log(this.verif);
    this.getCartDetails()
    
  }
  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response:any)=>{
        console.log(response);
        this.cartDetails=response
        if (this.cartDetails.length!=0) {
          this.verif=true;
        }
        console.log(this.verif);
        
        
      },
      (error)=>{
        console.log(error);
        
      }
      
    )
  }

  Checkout(){
   /* this.productService.getProductDetails(false,0).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
        
      }
    )*/
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:false,id:0
    }])
  }

  delete(cartId:number){
    console.log(cartId);
    this.productService.deleteCartItems(cartId).subscribe(
      (response)=>{
        console.log(response);
        this.getCartDetails();
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
    
  }
}
