var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AUTOCOMPLETE_DIRECTIVES } from 'ionic2-auto-complete';
import { CategoryServiceProvider } from '../../providers/category-service';
import { HomeAppServiceProvider } from '../../providers/homeapp-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { GoogleMapsLatLng, Geocoder, Camera } from 'ionic-native';
import * as moment from "moment";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
var BudgetPage = (function () {
    function BudgetPage(navCtrl, navParams, formBuilder, geolocation, alertCtrl, camera, categoryServiceProvider, homeAppServiceProvider, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.categoryServiceProvider = categoryServiceProvider;
        this.homeAppServiceProvider = homeAppServiceProvider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.imageSrc = '';
        this.modes = [];
        this.bills = this.formBuilder.group({
            'amount': [navParams.get("amount") ? navParams.get("amount") : '',
                Validators.compose([Validators.required, Validators.maxLength(10),
                    Validators.pattern(/^\d+([.,]\d{1,2})?$/)])],
            'billDateTime': [navParams.get("billDateTime")
                    ? navParams.get("billDateTime") : moment().format("YYYY-MM-DDTHH:mm:ss"),
                Validators.required],
            'location': ['', Validators.required],
            'description': [navParams.get("description") ? navParams.get("description") : '',
                Validators.compose([Validators.maxLength(600)])],
            'modeOfPayment': ['Credit Card', Validators.required],
            'shopName': [navParams.get("shopName") ? navParams.get("shopName") : ''],
            'category': [''],
            'billImage': [''],
            'id': [''],
            'status': ['Active']
        });
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.billObservable = Observable.fromPromise(this.storage.get("billsLocal"));
        this.loadModesOfPayment();
    }
    BudgetPage.prototype.loadModesOfPayment = function () {
        var _this = this;
        this.homeAppServiceProvider.getModesOfPayment().subscribe(function (modes) { _this.modes = modes; console.log(modes); }, function (err) { return console.log(err); });
        /*this.storage.get('modeOfPayment').then((data) => {
            if(data != null)
            {
                 this.modes  = data;
            }
            
          });*/
    };
    BudgetPage.prototype.fillCategory = function (event, obj) {
        event.preventDefault();
        console.log(obj);
        this.searchbar.keyword = obj.innerText;
        this.searchbar.itemSelected.emit(obj.innerText);
    };
    BudgetPage.prototype.permissionCallBackSuccess = function () {
        console.log("Success Loading Permission Location........");
    };
    BudgetPage.prototype.permissionCallBackError = function () {
        console.log("Error Loading Permission Location........");
    };
    BudgetPage.prototype.takeBillSnapshot = function (event) {
        var _this = this;
        event.preventDefault();
        console.log("Taking Camera SnapShot........");
        this.permissions.requestPermission(this.permissionCallBackSuccess, this.permissionCallBackError, this.permissions.CAMERA);
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        };
        Camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(base64Image);
            _this.imageSrc = base64Image;
        }, function (err) {
            console.log(err);
        });
    };
    BudgetPage.prototype.loadLocation = function (event) {
        var _this = this;
        event.preventDefault();
        console.log("Taking load Location........");
        this.permissions.requestPermission(this.permissionCallBackSuccess, this.permissionCallBackError, this.permissions.ACCESS_FINE_LOCATION);
        //this.permissions.requestPermission(this.permissionCallBackSuccess,this.permissionCallBackError,
        //         this.permissions.ACCESS_COARSE_LOCATION);
        /*Diagnostic.isLocationAvailable().then(() => {
          console.log('Location is Available');
        }).catch(()=>{
          console.log('Location is Not Available');
          return;
        })*/
        var alert = this.alertCtrl.create({
            title: 'Error : Location',
            subTitle: 'Location Service not Available. Please Try Again',
            buttons: ['OK']
        });
        var option = {
            enableHighAccuracy: true,
            timeout: 10000
        };
        this.geolocation.getCurrentPosition(option).then(function (resp) {
            var location = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);
            var request = { position: location };
            Geocoder.geocode(request).then(function (results) {
                console.log(results);
                if (results) {
                    for (var t = 0; t < results.length; t++) {
                        console.log(JSON.stringify(results[t]));
                        if (results[t].subLocality) {
                            var currentLocation = results[t].subLocality + ", " + results[t].locality;
                            _this.bills.patchValue({ location: currentLocation });
                        }
                    }
                }
            }).catch(function (error) {
                console.log('Geocoder Error getting location Service.......................');
                console.log(error);
                var alert2 = _this.alertCtrl.create({
                    title: 'Error : Location 1',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert2.present();
            });
        }).catch(function (error) {
            console.log(' geolocationError getting location', error);
            console.log(error);
            var alert2 = _this.alertCtrl.create({
                title: 'Error : Location 2',
                subTitle: error,
                buttons: ['OK']
            });
            alert2.present();
        });
    };
    BudgetPage.prototype.logForm = function (event) {
        var _this = this;
        console.log(event);
        console.log(this.bills.value["modeOfPayment"]);
        console.log(this.bills.value["modeOfPayment"].length);
        console.log(this.searchbar.getValue());
        var categoryName = this.searchbar.getValue();
        this.bills.patchValue({ category: categoryName });
        this.bills.patchValue({ billImage: this.imageSrc });
        var validationAlert = this.alertCtrl.create({
            title: 'Validation Error: Submit Bill',
            subTitle: 'Required Fields Missing',
            buttons: ['OK']
        });
        var errorAlert = this.alertCtrl.create({
            title: 'Error : Submit Bill',
            subTitle: 'Error in Processing',
            buttons: ['OK']
        });
        var successAlert = this.alertCtrl.create({
            title: 'Success : Submit Bill',
            subTitle: 'Submitted for Processing',
            buttons: ['OK']
        });
        if (this.bills.valid && categoryName && categoryName.length > 0) {
            // this.loading.present(); 
            this.bills.patchValue({ id: Date.now().toString() });
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
                .finally(function () { return _this.loading.dismiss(); })
                .subscribe(function (success) {
                console.log(success);
                successAlert.present();
                if (_this.navParams.get("smsPage")) {
                    _this.navCtrl.pop();
                }
            }, function (err) { console.log(err); errorAlert.present(); });
        }
        else {
            validationAlert.present();
        }
        /* */
    };
    BudgetPage.prototype.ionViewDidLoad = function () {
        this.permissions = window.plugins ? window.plugins.permissions : null;
        /*console.log('ionViewDidLoad BudgetPage');
           this.promise = new Promise((resolve,reject) => {
                   setTimeout( () =>{
                       resolve(42);
                   },5000);
    
                console.log("I am starting");
          });
          this.promise.then(x => console.log(x));*/
    };
    return BudgetPage;
}());
__decorate([
    ViewChild('searchbar'),
    __metadata("design:type", Object)
], BudgetPage.prototype, "searchbar", void 0);
BudgetPage = __decorate([
    Component({
        selector: 'page-budget',
        templateUrl: 'budget.html',
        providers: [AUTOCOMPLETE_DIRECTIVES, CategoryServiceProvider]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder,
        Geolocation, AlertController,
        Camera, CategoryServiceProvider,
        HomeAppServiceProvider,
        LoadingController,
        Storage])
], BudgetPage);
export { BudgetPage };
//# sourceMappingURL=budget.js.map