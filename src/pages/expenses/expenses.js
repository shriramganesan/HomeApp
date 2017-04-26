var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { BillsPage } from '../bills/bills';
import { BudgetPage } from '../budget/budget';
import { HomeAppServiceProvider } from '../../providers/homeapp-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as moment from "moment";
/*
  Generated class for the Expenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ExpensesPage = (function () {
    function ExpensesPage(navCtrl, navParams, formBuilder, homeAppServiceProvider, storage, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.homeAppServiceProvider = homeAppServiceProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.smsPage = BillsPage;
        this.newBillPage = BudgetPage;
        this.bills = [];
        this.billsLocal = [];
        this.homeAppServiceProvider.getBillsData().subscribe(function (bills) { _this.bills = bills; console.log(bills); }, function (err) { return console.log(err); });
        this.getBillObs = Observable.fromPromise(this.storage.get("billsLocal"));
        this.refreshData();
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }
    ExpensesPage.prototype.formatDate = function (input) {
        return moment(input).utcOffset(-0).format("YYYY-MM-DDTHH:mm:ss");
    };
    ExpensesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExpensesPage');
    };
    ExpensesPage.prototype.showLocalBill = function (localBill) {
        var message = '<br/>Category: ' + localBill.categoryId.categoryName;
        message += '<br/>Amount: Rs. ' + localBill.amount;
        message += '<br/>Location: ' + localBill.location;
        var alert = this.alertCtrl.create({
            title: '<u>Server : Bill Details</u>',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ExpensesPage.prototype.syncData = function () {
        var _this = this;
        var serverData = [];
        this.getBillObs.subscribe(function (data) {
            serverData = data;
        }, function (err) { return console.log(err); });
        this.homeAppServiceProvider.syncLocalBillData(serverData)
            .finally(function () { return _this.loading.dismiss(); })
            .subscribe(function (success) {
        }, function (err) { console.log(err); });
    };
    ExpensesPage.prototype.refreshData = function () {
        var _this = this;
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
        this.homeAppServiceProvider.getBillsData().subscribe(function (data) {
            console.log(data);
            _this.billsLocal = data;
        }, function (error) { console.log(error); });
    };
    ExpensesPage.prototype.deleteLocalBill = function (billLocal) {
        var _this = this;
        //var obs : Observable<any> =Observable.fromPromise(this.storage.get("billsLocal"));
        this.getBillObs.subscribe(function (data) {
            console.log(billLocal.id);
            var index = data.findIndex(function (d) { return JSON.parse(d).id == billLocal.id; });
            if (index != -1 && billLocal.id) {
                var newArr = data.slice();
                data.splice(index, 1);
                _this.storage.set('billsLocal', data).then(function (d) {
                    console.log("Finished...." + data.length);
                    console.log(data.length);
                    _this.refreshData();
                });
            }
        }, function (err) { return console.log(err); });
    };
    ExpensesPage.prototype.editLocalBill = function (billLocal) {
    };
    return ExpensesPage;
}());
ExpensesPage = __decorate([
    Component({
        selector: 'page-expenses',
        templateUrl: 'expenses.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder,
        HomeAppServiceProvider, Storage,
        AlertController, LoadingController])
], ExpensesPage);
export { ExpensesPage };
//# sourceMappingURL=expenses.js.map