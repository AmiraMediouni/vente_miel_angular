import { OrderQuantity } from "./order-quantity.model";

export interface MyOrderDetails{
    orderId:number,
    orderFullName:string,
    orderFullAddress:string,
    orderContactNumber:string,
    orderStatus:string,
    orderAmount:number,
    product:any,
    user:any;
}