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
import { GooglePlus } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { Page1 } from '../page1/page1';
import { LoginPageServiceProvider } from '../../providers/loginpage-service';
import { AlertController } from 'ionic-angular';
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, storage, loginPageSP, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loginPageSP = loginPageSP;
        this.alertCtrl = alertCtrl;
        this.userLoginStorage = Observable.fromPromise(this.storage.get("user"));
    }
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginpagePage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var user = { "email": "shriram.ganesan@gmail.com",
            "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjOTE1NzZmYzkzZGYzYWRjNTk4OTZjNDk1Y2I2NzI5ZGQ1YmMwMjMifQ.eyJhenAiOiI4MDE2OTAyMDM1NTQtc2FrM3BqZG9la2Q5dTUzYTk5cXN1ZzZucTNnYmtnaDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4MDE2OTAyMDM1NTQtYTY2czFxcDU3OW0ydmJxNGdjbGQ2NjBhcGhyNjl0NmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMyNDc1MTEwNzc1MDU3ODg4NzUiLCJlbWFpbCI6InNocmlyYW0uZ2FuZXNhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDkyMzcyMDc5LCJleHAiOjE0OTIzNzU2NzksIm5hbWUiOiJzaHJpcmFtIGdhbmVzYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01dFhkNU0zREE1Zy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFCcy8yY1FLVUppREpxay9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoic2hyaXJhbSIsImZhbWlseV9uYW1lIjoiZ2FuZXNhbiIsImxvY2FsZSI6ImVuIn0.bfOHCMTY0Vdg8ue39la5-GXsPzXRPKB2Vw2EHjMIO9kFVCPcis2SF_uca9KLZus8RlF55T09ol1kC61KYQ0hW85eWR1Be08E4lZXbFA9hsIs5AX45kAsiVJIRLOThHxLAXV2ew8lQ2VbA66op7Evcz2A42d521iAwk4xZlUJSn2laJ9rGvKDCl7tsk_uKbI7T7LUTvnABk_cfCx8dxBBCutkHiZ1PXJ91KoNuNUc9kv3WSfD58EO5lxsUQhO5ygS_wk0ZY9W1PrhaZRx2ezHrQaQyUozaHQb5DbpQ_8b8aJJ8HsMVU4OVHtwNjc4f1ysYR9pHZT5jGduRSmZ49UR1A",
            "userId": "103247511077505788875",
            "displayName": "shriram ganesan",
            "familyName": "ganesan",
            "givenName": "shriram",
            "imageUrl": "https://lh6.googleusercontent.com/-5tXd5M3DA5g/AAAAAAAAAAI/AAAAAAAAABs/2cQKUJiDJqk/s96-c/photo.jpg"
        };
        this.loginPageSP.loginUser(user).subscribe(function (success) {
            _this.storeLocalStorage(user);
        }, function (err) {
            console.log("Error=========================================================");
            _this.showLoginError("101");
        });
        /*GooglePlus.login({
           'webClientId': '801690203554-a66s1qp579m2vbq4gcld660aphr69t6k.apps.googleusercontent.com',
           'offline': true
        }).then((user) => {
            console.log("Success=========================================================");
            console.log(JSON.stringify(user));
            
            this.loginPageSP.loginUser(user).subscribe(
                success => {
                        this.storeLocalStorage(user);
                },
                err => {
                    console.log("Error=========================================================");
                    this.showLoginError("101");
                }
            );
        }, (err) => {
            console.log("Error=========================================================");
            console.log(err);
            this.showLoginError("100");
        }); */
    };
    LoginPage.prototype.storeLocalStorage = function (user) {
        var _this = this;
        this.storage.set("user", {
            name: user.displayName,
            email: user.email,
            picture: user.imageUrl
        })
            .then(function () { return _this.navCtrl.setRoot(Page1); })
            .catch(function (err) {
            console.log(err);
            _this.showLoginError("102");
        });
    };
    LoginPage.prototype.showLoginError = function (errorCode) {
        var alert = this.alertCtrl.create({
            title: 'Error : Login',
            subTitle: "Error Code: " + errorCode,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.logout = function () {
        var _this = this;
        GooglePlus.logout().then(function () {
            console.log("logged out");
            _this.storage.remove('user');
            //this.navCtrl.push(LoginPage);
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-loginpage',
        templateUrl: 'loginpage.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Storage,
        LoginPageServiceProvider,
        AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=loginpage.js.map