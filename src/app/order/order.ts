export class Order{
    orderId!:number;
	customerId!:number;
    carId!:number;
	washerId!:number;
	planId!:number;
	promocode!:string;
	totalPrice!:number;
	orderStatus!:string;
	beforeWashPic!:string;
	afterWashPic!:string;
	placedOn!:Date;
	scheduledOn!:Date;
	closedOn!:Date;
}