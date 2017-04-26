export class BillEntry{

	id: string;	
	categoryId: any;
	smsId: any;
	itemsId: any;
	amount : number;
	modeOfPayment:any;
	shopName: string;
	location: string;
	billDate: string; 
	loginEntity:any;
	description: string;
	billImage: string;
	showDetails : boolean = false;
	icon : string = 'ios-remove-circle-outline';
}