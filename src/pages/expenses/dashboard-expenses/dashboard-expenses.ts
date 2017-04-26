import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BillServiceProvider} from '../../../providers/bill-service';
import { BillEntry} from '../../../model/BillEntry';
import { Observable } from 'rxjs/Rx';
import * as moment from "moment";
import { LoginPageServiceProvider } from '../../providers/loginpage-service';
import { AlertController,LoadingController,Loading } from 'ionic-angular';
import { BillsPage } from '../bills/bills';
/*
  Generated class for the DashboardExpenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard-expenses',
  templateUrl: 'dashboard-expenses.html'
})
export class DashboardExpensesPage {
  private bills : Observable<BillEntry[]>;
  private loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  		public billServiceProvider : BillServiceProvider,
  		public alertCtrl: AlertController,
    	private loadingCtrl: LoadingController){
  		this.bills = this.billServiceProvider.billsLot;
        this.billServiceProvider.loadAll();
        this.loading = this.loadingCtrl.create({
      		content: 'Please wait...'
    	});
  }
  formatDate(input){
  	
    return moment(input).format("DD-MM-YY HH:mm:ss");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardExpensesPage');
  }
  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }
  viewBill(bill) {

  }
  editBill(bill : BillEntry){
  			/*this.billServiceProvider.updateBill(bill).subscribe(
  				success => console.log(success),
  				error => console.log(error)
  			);*/
  			 this.navCtrl.push(BillsPage,{
		          amount: 	bill.amount,
		          billDateTime: moment(bill.billDate).format('YYYY-MM-DDTHH:mm:ss'),
		          shopName: bill.shopName,
		          description : bill.description,
		          category : bill.categoryId.categoryName,
		          location : bill.location,
		          modeOfPayment : bill.modeOfPayment.modeOfPayment,
		          billImage : bill.billImage,
		          id : bill.id
       		 });

  }
  deleteBill(bill){
  			let alert = this.alertCtrl.create({
			    title: 'Confirm Delete',
			    message: 'Do you want to delete the expense?',
			    buttons: [
			      {
			        text: 'Cancel',
			        role: 'cancel',
			        handler: () => {
			          console.log('Cancel clicked');
			        }
			      },
			      {
			        text: 'Delete',
			        handler: () => {
			          console.log('Buy clicked');
			          console.log(bill);
			  			this.loading.present();
			  			this.billServiceProvider.deleteBill(bill).subscribe(
			  				success => {this.loading.dismiss();console.log(success);this.billServiceProvider.loadAll();},
			  				error =>   {this.loading.dismiss();console.log(error)}
			  			);
			        }
			      }
			    ]
			  });
  		    alert.present();
  }
}
