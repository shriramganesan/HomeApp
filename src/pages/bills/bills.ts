import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the Bills page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var window: any;


@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html'
})
export class BillsPage {
  public smses:any;
  public statusSMS : any;
  public permissions : any;
    public promise : any; 
    public dummyDate : any = 1445660125773;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillsPage');
    this.statusSMS="shriramganesan";
    this.permissions = window.plugins.permissions;
	  console.log(window);
	  console.log(window.SMS);
      
     
      
  }
  showAlert(item) {
    let alert = this.alertCtrl.create({
      title: 'SMS from'+item.address,
      subTitle: item.body,
      buttons: ['OK']
    });
    alert.present();
  }
  itemSelected(item){
      this.showAlert(item)
  }
  checkPermissionCallback(status) { 
          this.statusSMS=!status.hasPermission
      
  }
	getSMS(){
	    	    var errorCallback = function () {
	    	       
                    console.warn('Storage permission is not turned on');
                }
                this.permissions.requestPermission(
                 errorCallback,errorCallback,this.permissions.READ_SMS);	
					if(window.SMS) {
						    window.SMS.listSMS({},data=>{
						   
						      setTimeout(()=>{
						       console.log(data);
						        this.smses=data; 
						      },0)
						 
						    },error=>{
						      console.log(error);
						    });
					}
      //  this.permissions.hasPermission( this.permissions.READ_SMS,  this.checkPermissionCallback, null);
	   
	  
  }
}
