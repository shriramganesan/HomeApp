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
import { Observable } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeAppServiceProvider } from '../../providers/homeapp-service';
import { GooglePlus } from 'ionic-native';
var Page1 = (function () {
    function Page1(navCtrl, storage, homeAppServiceProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.homeAppServiceProvider = homeAppServiceProvider;
        this.modeOfPayment = Observable.fromPromise(this.storage.get("modeOfPayment"));
        console.log("Home Page Constructor");
    }
    Page1.prototype.logout = function () {
        var _this = this;
        GooglePlus.logout().then(function () {
            console.log("logged out");
            _this.storage.remove('user');
            //this.navCtrl.push(LoginPage);
        });
    };
    Page1.prototype.ngOnInit = function () {
        setInterval(this.checkServerConnection(), 1000);
    };
    Page1.prototype.checkServerConnection = function () {
        var _this = this;
        console.log("Checking Server Connection..........");
        this.homeAppServiceProvider.checkServerConnection()
            .finally(function () { return console.log(_this.serverConnection); }).
            subscribe(function (data) {
            _this.serverConnection = true;
        }, function (err) {
            _this.serverConnection = false;
            _this.loadModesOfPayment();
        });
    };
    Page1.prototype.loadModesOfPayment = function () {
        var _this = this;
        console.log("loadModesOfPayment.....");
        this.modeOfPayment.subscribe(function (data) {
            console.log(data);
            if (data == null) {
                var array = ['Credit Card', 'Debit Card', 'Cash', 'Wallet'];
                _this.storage.set('modeOfPayment', array);
                console.log("Mode of Payment loading over....");
            }
        }, function (err) {
            console.log("data.......error");
            console.log(err);
        });
    };
    return Page1;
}());
Page1 = __decorate([
    Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
    }),
    __metadata("design:paramtypes", [NavController, Storage,
        HomeAppServiceProvider])
], Page1);
export { Page1 };
//# sourceMappingURL=page1.js.map