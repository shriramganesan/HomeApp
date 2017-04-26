import { Component ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { BillsPage } from '../expenses/bills/bills';
import { SmsExpensesPage } from '../expenses/sms-expenses/sms-expenses';
import {  HomeAppServiceProvider } from '../../providers/homeapp-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { DashboardExpensesPage} from '../expenses/dashboard-expenses/dashboard-expenses';
import * as moment from "moment";
import { BillServiceProvider} from '../../providers/bill-service';
import {BillEntry} from '../../model/BillEntry';
import { Observable } from 'rxjs/Rx';/*
  Generated class for the Expenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {
  smsPage = SmsExpensesPage;
  newBillPage  = BillsPage;
  dashboard = DashboardExpensesPage;
  private bills : Observable<BillEntry[]>
  private billsLocal : any = [];
  getBillObs : any;
  loading : any;
  timer : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder
    ,private homeAppServiceProvider:HomeAppServiceProvider,public storage: Storage,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController,
    public billServiceProvider : BillServiceProvider,
    private cdr:ChangeDetectorRef) {
        	/*this.homeAppServiceProvider.getBillsData().subscribe(
                (bills) => {this.bills  = bills; console.log(bills)},
                (err) => console.log(err)
           );*/
           //this.getBillObs= Observable.fromPromise(this.storage.get("billsLocal"));
           //this.refreshData();
           this.loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
           this.bills = this.billServiceProvider.billsLot;
           this.billServiceProvider.loadAll();
           //setInterval(() => this.loadBillsData(), 5000);
          // cdr.markForCheck();
         // this.timer = Observable.timer(2000,5000);
          //this.timer.subscribe(t => this.loadBillsData);
  }
  loadBillsData(){
     console.log("calling load bill service "+this)
     this.billServiceProvider.loadAll();
  }
  getTotalExpensesLength(){
     let lengthExp : number = 0;
     this.bills.subscribe((data) =>lengthExp= data.length , (err) => console.log(err));
     return lengthExp;
  }
  formatDate(input){
    return moment(input).utcOffset(-0).format("YYYY-MM-DDTHH:mm:ss");
  }
  ionViewDidLoad() {
    
   
    console.log('ionViewDidLoad ExpensesPage');
  }
  showLocalBill(localBill){
          let message = '<br/>Category: '+localBill.categoryId.categoryName;
          message += '<br/>Amount: Rs. '+localBill.amount;
          message += '<br/>Location: '+localBill.location;
          let alert = this.alertCtrl.create({
                          title: '<u>Server : Bill Details</u>',
                          subTitle: message,
                          buttons: ['OK']
            });
          alert.present();
  }
  syncData(){
      let serverData = [];
      this.getBillObs.subscribe(data => 
          {
                   serverData = data;
          },err => console.log(err));

      this.homeAppServiceProvider.syncLocalBillData(serverData)
                  .finally(() => this.loading.dismiss())
                  .subscribe(
                  (success) => {
                         
                    
                  },
                  (err) =>     {console.log(err);}
      );     
  }
  refreshData(){
     /* this.getBillObs= Observable.fromPromise(this.storage.get("billsLocal"));
      this.billsLocal = [];
      this.getBillObs.subscribe(data => 
          {
                
                 if(data!=null && data.length > 0){
                      console.log(data.length + "<<<<<<<<<<<,,")
                      data.map(item =>
                            {
                                console.log(item);
                                this.billsLocal.push(JSON.parse(item));
                            }
                       )
                  }                  

          },err => console.log(err));     */
          this.homeAppServiceProvider.getBillsData().subscribe(data =>
          {      console.log(data);
                 this.billsLocal = data;
          },
          (error) => {console.log(error)}
          );
  }
  deleteLocalBill(billLocal){
      //var obs : Observable<any> =Observable.fromPromise(this.storage.get("billsLocal"));
      this.getBillObs.subscribe(data => 
          {
               console.log(billLocal.id);
               var index= data.findIndex(d => JSON.parse(d).id == billLocal.id);               
               if(index != -1 && billLocal.id){
                   let newArr= [...data];
                   data.splice(index,1);
                   this.storage.set('billsLocal', data).then(d =>{
                         console.log("Finished...."+data.length);
                         console.log(data.length);
                         this.refreshData()
                       }
                   );                   
               }
           }
           ,err => console.log(err));
  }
  editLocalBill(billLocal){

  }
}
