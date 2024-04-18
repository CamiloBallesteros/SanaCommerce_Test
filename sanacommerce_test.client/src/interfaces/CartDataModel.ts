import Order_Details from "./OrderDetailsModel";

export default interface CartDataModel {
    customerId: number | undefined,
    orderDetails: Order_Details[] | undefined
}