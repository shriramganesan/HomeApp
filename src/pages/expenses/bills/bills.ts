import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AUTOCOMPLETE_DIRECTIVES } from 'ionic2-auto-complete';
import {  CategoryServiceProvider } from '../../../providers/category-service';
import {  HomeAppServiceProvider } from '../../../providers/homeapp-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {  GoogleMapsLatLng,GeocoderRequest,GeocoderResult,Geocoder ,Camera, CameraOptions,GeolocationOptions } 
from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Diagnostic } from 'ionic-native';
import * as moment from "moment";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { BillServiceProvider} from '../../../providers/bill-service';
/*
  Generated class for the Budget page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
 */
declare var window: any;
declare var hash : any;

@Component({
  selector: 'page-budget',
  templateUrl: 'bills.html',
  providers : [AUTOCOMPLETE_DIRECTIVES,CategoryServiceProvider]
})
export class BillsPage {
  @ViewChild('searchbar') searchbar: any;
  public promise : any; 
  private bills : FormGroup;
  public permissions : any;
  public imageSrc : any = '';
  public modes : any = [];
  public loading : any;
  private billObservable : any;
  public categoryHints : String[] = ["Grocery","Petrol","Mobile"];
  public locationHints : String[] = ["Home","Office"];
  public shopHints : String[] =     ["7Days"];
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,
      private geolocation: Geolocation,public alertCtrl: AlertController,
      private camera: Camera ,private categoryServiceProvider:CategoryServiceProvider,
      private homeAppServiceProvider:HomeAppServiceProvider,
      public loadingCtrl: LoadingController,
      public storage: Storage,
      public billServiceProvider : BillServiceProvider) {
     this.bills = this.formBuilder.group({              
      'amount': [navParams.get("amount")?navParams.get("amount"):'', 
          Validators.compose([Validators.required,Validators.maxLength(10), 
                              Validators.pattern(/^\d+([.,]\d{1,2})?$/)])],
          'billDateTime': [
            navParams.get("billDateTime")?navParams.get("billDateTime"):moment().format("YYYY-MM-DDTHH:mm:ss"),Validators.required],
           'location': [ navParams.get("location"), Validators.required],
           'description':[navParams.get("description")?navParams.get("description"):'',Validators.compose([Validators.maxLength(600)])],
           'modeOfPayment' : [navParams.get("modeOfPayment")?navParams.get("modeOfPayment"):'Credit Card',Validators.required],
           'shopName' : [navParams.get("shopName")?navParams.get("shopName"):''],
           'category' : [navParams.get("category")?navParams.get("category"):''],
           'billImage': [navParams.get("billImage")?navParams.get("billImage"):''],
           'id' :       [navParams.get("id")?navParams.get("id"):''],
           'status' : ['Active']
    });    
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
    this.billObservable= Observable.fromPromise(this.storage.get("billsLocal"));
    this.loadModesOfPayment();
    this.loadCategoryHints();
    this.loadLocationHints();
    this.loadShopHints();
  }
  loadCategoryHints(){
    this.categoryServiceProvider.getCategoryHints("",3).subscribe(results => this.categoryHints=results,err=>console.log(err));
  }
  loadLocationHints(){
    this.homeAppServiceProvider.getLocationHints("",3).subscribe(results => this.locationHints=results,err=>console.log(err));
  }
  loadShopHints(){
    this.homeAppServiceProvider.getShopHints("",3).subscribe(results => this.shopHints=results,err=>console.log(err));
  }
  loadModesOfPayment(){
    
    this.homeAppServiceProvider.getModesOfPayment().subscribe(
        (modes) => {this.modes  = modes; console.log(modes)},
        (err) => console.log(err)
    );

    /*this.storage.get('modeOfPayment').then((data) => {
        if(data != null)
        {
             this.modes  = data;
        }
        
      });*/
   
  }
  
  fillCategory(obj){
    //event.preventDefault();
    console.log(obj);
    this.searchbar.keyword=obj;
    this.searchbar.itemSelected.emit(obj);
  }
  fillLocation(obj){
    //event.preventDefault();
    console.log(obj);
     this.bills.patchValue({location:obj});
  }
  fillShop(obj){
    //event.preventDefault();
    console.log(obj);
    this.bills.patchValue({shopName:obj});
  }
  permissionCallBackSuccess(){
        console.log("Success Loading Permission Location........")
  }
  permissionCallBackError(){
        console.log("Error Loading Permission Location........")
  }
  takeBillSnapshot(event){
    event.preventDefault();
    console.log("Taking Camera SnapShot........")
    this.permissions.requestPermission(this.permissionCallBackSuccess,this.permissionCallBackError,this.permissions.CAMERA);   
    const options: CameraOptions = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }   
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.imageSrc = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
  loadLocation(event){
    event.preventDefault();
    console.log("Taking load Location........")
    this.permissions.requestPermission(this.permissionCallBackSuccess,this.permissionCallBackError,
              this.permissions.ACCESS_FINE_LOCATION);   
    //this.permissions.requestPermission(this.permissionCallBackSuccess,this.permissionCallBackError,
     //         this.permissions.ACCESS_COARSE_LOCATION);
    /*Diagnostic.isLocationAvailable().then(() => {
      console.log('Location is Available');
    }).catch(()=>{
      console.log('Location is Not Available');
      return;
    })*/
    let alert = this.alertCtrl.create({
      title: 'Error : Location',
      subTitle: 'Location Service not Available. Please Try Again',
      buttons: ['OK']
    });
    let option : GeolocationOptions ={
        enableHighAccuracy: true,
        timeout: 10000
    }

    this.geolocation.getCurrentPosition(option).then((resp) => {
      let location : GoogleMapsLatLng = new GoogleMapsLatLng(resp.coords.latitude,resp.coords.longitude);               
      let request : GeocoderRequest = { position: location };
          Geocoder.geocode(request).then((results : GeocoderResult[])=> {
            console.log(results);
            if(results){
              for(var t=0;t<results.length;t++){
                console.log(JSON.stringify(results[t]));
                if(results[t].subLocality){
                  let currentLocation = results[t].subLocality +", "+results[t].locality;
                  this.bills.patchValue({location:currentLocation});
                }                        
              } 
            }
          }).catch((error) => { 
            console.log('Geocoder Error getting location Service.......................');
            console.log(error);
            let alert2 = this.alertCtrl.create({
              title: 'Error : Location 1',
              subTitle: error,
              buttons: ['OK']
            });
            alert2.present(); 
          });

    }).catch((error) => {
      console.log(' geolocationError getting location', error);
      console.log(error);
            let alert2 = this.alertCtrl.create({
              title: 'Error : Location 2',
              subTitle: error,
              buttons: ['OK']
            });
            alert2.present(); 
    }); 

  }
  logForm(event){
    console.log(event);
    console.log(this.bills.value["modeOfPayment"]);
    console.log(this.bills.value["modeOfPayment"].length);  
    console.log(this.searchbar.getValue())
    var categoryName=this.searchbar.getValue();
    this.bills.patchValue({category:categoryName});
    this.bills.patchValue({billImage:this.imageSrc});

    let validationAlert = this.alertCtrl.create({
      title: 'Validation Error: Submit Bill',
      subTitle: 'Required Fields Missing',
      buttons: ['OK']
    });
    let errorAlert = this.alertCtrl.create({
      title: 'Error : Submit Bill',
      subTitle: 'Error in Processing',
      buttons: ['OK']
    });
    let successAlert = this.alertCtrl.create({
      title: 'Success : Submit Bill',
      subTitle: 'Submitted for Processing',
      buttons: ['OK']
    });
    if(this.bills.valid && categoryName && categoryName.length > 0){   
      // this.loading.present(); 

      //this.bills.patchValue({id:Date.now().toString()}); 
      /*this.storage.get('billsLocal').then((data) => {
        if(data != null)
        {
          console.log(this.bills.value);
          data.push(JSON.stringify(this.bills.value));
          this.storage.set('billsLocal', data);
        }
        else
        {
          let array = [];
          array.push(JSON.stringify(this.bills.value));
          this.storage.set('billsLocal', array);
        }
      });*/
      //Local Storage
      /*this.billObservable
      .finally(() => this.loading.dismiss())
      .subscribe(data => 
          {            
            if(data != null){
              console.log(this.bills.value);
              data.push(JSON.stringify(this.bills.value));
              this.storage.set('billsLocal', data);
            }
            else{
              let array = [];
              array.push(JSON.stringify(this.bills.value));
              this.storage.set('billsLocal', array);
            }
            successAlert.present();
            if(this.navParams.get("smsPage")){
                      this.navCtrl.pop();
            }
          },
          err => {
            console.log(err);
            errorAlert.present();
          }
      );*/
      //Server Storage
       this.homeAppServiceProvider.submitBillsData(this.bills.value)
                  .finally(() => this.loading.dismiss())
                  .subscribe(
                  (success) => {
                    console.log(success); successAlert.present();
                    this.billServiceProvider.loadAll();
                    if(this.navParams.get("smsPage")){
                      this.navCtrl.pop();
                    }else{
                       this.navCtrl.pop();
                    }
                  },
                  (err) =>     {console.log(err);errorAlert.present();}
                );

    }
    else{
      validationAlert.present();
    }
    /* */
  }
  ionViewDidLoad() {
    this.permissions = window.plugins?window.plugins.permissions:null;
    this.fillCategory(this.navParams.get("category")?this.navParams.get("category"):'');
    this.imageSrc = this.navParams.get("billImage")?this.navParams.get("billImage"):''
    /*console.log('ionViewDidLoad BudgetPage');
       this.promise = new Promise((resolve,reject) => {
               setTimeout( () =>{
                   resolve(42);
               },5000);     

            console.log("I am starting");
      });
      this.promise.then(x => console.log(x));*/
  }

}
