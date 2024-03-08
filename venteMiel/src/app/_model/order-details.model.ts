import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    
    fullName:string,
    fullAddress:string,
    contactNumber:string,
    commandeQuantiteList:OrderQuantity[]
    
}