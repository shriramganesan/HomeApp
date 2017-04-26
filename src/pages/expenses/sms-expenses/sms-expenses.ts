import { Component } from '@angular/core';
import { Nav,NavController, NavParams } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as moment from "moment";
import { BillsPage } from '../bills/bills';
/*
  Generated class for the Bills page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var window: any;


@Component({
  selector: 'page-bills',
  templateUrl: 'sms-expenses.html'
})
export class SmsExpensesPage {
  public smses:any;
  public statusSMS : any;
  public permissions : any;
  public promise : any; 
  public dummyDate : any = 1445660125773;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

      this.smses = [{'address':'AMHDFCBK','date':this.dummyDate,
      'body':'Rs.2151.00 was spent on ur HDFCBank CREDIT Card ending 6506 on 2017-03-30:22:51:31 at TOIT BREWPUB.Avl bal - Rs.118798.76, curr o/s - Rs.81201.24'
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillsPage');
    this.statusSMS="shriramganesan";
    this.permissions = window.plugins.permissions;
	  console.log(window);
	  console.log(window.SMS);
      
     
      
  }
  showAlert(sms) {
   /* let alert = this.alertCtrl.create({
      title: 'SMS from'+item.address,
      subTitle: item.body,
      buttons: ['OK']
    });
    alert.present();*/

  let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Do you parse this SMS?\n' + sms.body,
    buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Parse',
            handler: () => {
              this.parseSMS(sms)
            }
          }
        ]
      });
    alert.present();

  }
  parseSMS(sms){
        let dataRegex=/\d{4}-\d{2}-\d{2}:\d{2}:\d{2}:\d{2}/g;
        let storeLocationRegex = /at\s(.*?)\./;
        let amountRegex = /((Rs|INR)(\s*|.)\d+((\.|\,)\d*)?)/
        let message = sms.body;
        
        let amount = message.match(amountRegex);
        let storeLoc =  message.match(storeLocationRegex);
        let dateTime= message.match(dataRegex);
/*
        console.log(amount[0]);
        console.log(storeLoc[1]);
        console.log(dateTime[0]);*/
        console.log(moment);
        this.navCtrl.push(BillsPage,{
          amount: (amount&&amount.length>0)?amount[0].replace("Rs.","").replace("Rs","").replace("INR",""):'',
          billDateTime: (dateTime&&dateTime.length>0)?moment(dateTime[0],"YYYY-MM-DD:HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"):'',
          shopName: (storeLoc&&storeLoc.length>1)?storeLoc[1]:'',
          description : sms.body,
          smsPage : true
        });
  }

  itemSelected(item){
      this.showAlert(item)
  }
  checkPermissionCallback(status) { 
          this.statusSMS=!status.hasPermission
      
  }
  getSMS(){

                var smsAddressArr = ['DMHDFC','HPHDFC','AMHDFC','ADHDFC','ICICI','PNB'];
	    	        var errorCallback = function () {
	    	       
                    console.warn('Storage permission is not turned on');
                }
                this.permissions.requestPermission(errorCallback,errorCallback,this.permissions.READ_SMS);
                this.permissions.requestPermission(errorCallback,errorCallback,this.permissions.ACCESS_COARSE_LOCATION);
                if(window.SMS) {
						    window.SMS.listSMS({'maxCount':1000},data=>{						   
						      setTimeout(()=>{
						       console.log(data);
						            this.smses=data.filter(d => {
                              var flag = false;
                              for(var i=0;i<smsAddressArr.length;i++) {
                                  if (d.address.indexOf(smsAddressArr[i]) > -1) 
                                      { 
                                        flag=true; 
                                        break; 
                                      }
                              };
                              return flag;
                        }); 
						      },0)					 
						    },error=>{
						      console.log(error);
						    });
					}
      //  this.permissions.hasPermission( this.permissions.READ_SMS,  this.checkPermissionCallback, null);
	   
	  
  }
}
