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
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';
import * as moment from "moment";
var BillsPage = (function () {
    function BillsPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.dummyDate = 1445660125773;
        this.smses = [{ 'address': 'AMHDFCBK', 'date': this.dummyDate,
                'body': 'Rs.2151.00 was spent on ur HDFCBank CREDIT Card ending 6506 on 2017-03-30:22:51:31 at TOIT BREWPUB.Avl bal - Rs.118798.76, curr o/s - Rs.81201.24'
            }];
    }
    BillsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BillsPage');
        this.statusSMS = "shriramganesan";
        this.permissions = window.plugins.permissions;
        console.log(window);
        console.log(window.SMS);
    };
    BillsPage.prototype.showAlert = function (sms) {
        /* let alert = this.alertCtrl.create({
           title: 'SMS from'+item.address,
           subTitle: item.body,
           buttons: ['OK']
         });
         alert.present();*/
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you parse this SMS?\n' + sms.body,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Parse',
                    handler: function () {
                        _this.parseSMS(sms);
                    }
                }
            ]
        });
        alert.present();
    };
    BillsPage.prototype.parseSMS = function (sms) {
        var dataRegex = /\d{4}-\d{2}-\d{2}:\d{2}:\d{2}:\d{2}/g;
        var storeLocationRegex = /at\s(.*?)\./;
        var amountRegex = /((Rs|INR)(\s*|.)\d+((\.|\,)\d*)?)/;
        var message = sms.body;
        var amount = message.match(amountRegex);
        var storeLoc = message.match(storeLocationRegex);
        var dateTime = message.match(dataRegex);
        /*
                console.log(amount[0]);
                console.log(storeLoc[1]);
                console.log(dateTime[0]);*/
        console.log(moment);
        this.navCtrl.push(BudgetPage, {
            amount: (amount && amount.length > 0) ? amount[0].replace("Rs.", "").replace("Rs", "").replace("INR", "") : '',
            billDateTime: (dateTime && dateTime.length > 0) ? moment(dateTime[0], "YYYY-MM-DD:HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss") : '',
            shopName: (storeLoc && storeLoc.length > 1) ? storeLoc[1] : '',
            description: sms.body,
            smsPage: true
        });
    };
    BillsPage.prototype.itemSelected = function (item) {
        this.showAlert(item);
    };
    BillsPage.prototype.checkPermissionCallback = function (status) {
        this.statusSMS = !status.hasPermission;
    };
    BillsPage.prototype.getSMS = function () {
        var _this = this;
        var smsAddressArr = ['DMHDFC', 'HPHDFC', 'AMHDFC', 'ADHDFC', 'ICICI', 'PNB'];
        var errorCallback = function () {
            console.warn('Storage permission is not turned on');
        };
        this.permissions.requestPermission(errorCallback, errorCallback, this.permissions.READ_SMS);
        this.permissions.requestPermission(errorCallback, errorCallback, this.permissions.ACCESS_COARSE_LOCATION);
        this.permissions.requestPermission(errorCallback, errorCallback, this.permissions.CAMERA);
        this.permissions.requestPermission(errorCallback, errorCallback, this.permissions.ACCESS_FINE_LOCATION);
        if (window.SMS) {
            window.SMS.listSMS({ 'maxCount': 1000 }, function (data) {
                setTimeout(function () {
                    console.log(data);
                    _this.smses = data.filter(function (d) {
                        var flag = false;
                        for (var i = 0; i < smsAddressArr.length; i++) {
                            if (d.address.indexOf(smsAddressArr[i]) > -1) {
                                flag = true;
                                break;
                            }
                        }
                        ;
                        return flag;
                    });
                }, 0);
            }, function (error) {
                console.log(error);
            });
        }
        //  this.permissions.hasPermission( this.permissions.READ_SMS,  this.checkPermissionCallback, null);
    };
    return BillsPage;
}());
BillsPage = __decorate([
    Component({
        selector: 'page-bills',
        templateUrl: 'bills.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], BillsPage);
export { BillsPage };
//# sourceMappingURL=bills.js.map