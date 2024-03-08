import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'ProductName', 'Name','Adress','ContactNumber','Status','Action'];
  myOrderDetails:MyOrderDetails[]=[]
  status:string="All"
  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.getAllOrdersForAdmin(this.status);
  }
  getAllOrdersForAdmin(statusParameter:string){
    this.productService.getAllOrdersForAdmin(statusParameter).subscribe(
      (response)=>{
        console.log(response);
        this.myOrderDetails=response
        
        
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  markAsDelivered(orderId:number){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response)=>{
        console.log(response);
        this.getAllOrdersForAdmin(this.status)
              
      },(error)=>{
        console.log(error);
        
      })
  }
   
}
