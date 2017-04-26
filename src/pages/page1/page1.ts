import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {  HomeAppServiceProvider } from '../../providers/homeapp-service';
import { Injectable } from '@angular/core';
import { GooglePlus } from 'ionic-native';
import { LoginPage } from '../loginpage/loginpage';
import { BillsPage } from '../expenses/bills/bills';
import { BudgetPage } from '../budget/budget';
import { ExpensesPage } from '../expenses/expenses';
import { SettingsPage} from '../settings/settings';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  private modeOfPayment : Observable<any>;
  private loginInfo : Observable<any>;
  public serverConnection : any;
  public user : any = [];
  expensePage = ExpensesPage;
  budgetPage  = BudgetPage;
  settingsPage = SettingsPage;


  constructor(public navCtrl: NavController,public storage: Storage
  				,private homeAppServiceProvider:HomeAppServiceProvider) {
    	this.modeOfPayment= Observable.fromPromise(this.storage.get("modeOfPayment"));
    	this.loginInfo= Observable.fromPromise(this.storage.get("user"));
      console.log("Home Page Constructor");
    	this.loginInfo.subscribe(
        (user) => {
        
          this.user=user;
          console.log(user);
        },
        (err) => console.log(err)
       );
  }	
   
 
    logout(){
 
       GooglePlus.logout().then(() => {
            console.log("logged out");
            this.storage.remove('user');
            this.navCtrl.setRoot(LoginPage)
        //this.navCtrl.push(LoginPage);
        }).catch((err) => {
          console.log(err);
            this.storage.remove('user');
            this.navCtrl.setRoot(LoginPage);

        }); 
 
    }
  ngOnInit(){
   //setInterval(this.checkServerConnection(),1000);
  }
  checkServerConnection(){
  		console.log("Checking Server Connection..........");
  		this.homeAppServiceProvider.checkServerConnection()
  		.finally(() => console.log(this.serverConnection)).
  		subscribe(
    		data => {
    			  this.serverConnection= true;      
    		},
            err => {
                  this.serverConnection= false;    
                  this.loadModesOfPayment();           
            }
    	);
    	

  }
  loadModesOfPayment(){
  		console.log("loadModesOfPayment.....")
  		this.modeOfPayment.subscribe(data => 
  				 {
  				  		console.log(data);
                    	if(data == null){              
			              let array = ['Credit Card','Debit Card','Cash','Wallet'];
			               this.storage.set('modeOfPayment', array);
			               console.log("Mode of Payment loading over....")
			            }		                    
                  },
                  (err) =>     {
                  	console.log("data.......error")
                  	console.log(err);

                  }
  		)
  }
}
