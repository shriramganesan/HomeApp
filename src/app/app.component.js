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
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/loginpage/loginpage';
//import { Page2 } from '../pages/page2/page2';
import { Push } from "@ionic-native/push";
import { BillsPage } from '../pages/bills/bills';
import { BudgetPage } from '../pages/budget/budget';
import { ExpensesPage } from '../pages/expenses/expenses';
import { AlertController } from 'ionic-angular';
//import { RemindersPage } from '../pages/reminders/reminders';
//import { SettingsPage } from '../pages/settings/settings';
//import { SocialmediaPage } from '../pages/socialmedia/socialmedia';
import { HomeAppServiceProvider } from '../providers/homeapp-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
var MyApp = (function () {
    function MyApp(platform, push, alertCtrl, homeAppServiceProvider, localNotifications) {
        this.platform = platform;
        this.push = push;
        this.alertCtrl = alertCtrl;
        this.homeAppServiceProvider = homeAppServiceProvider;
        this.localNotifications = localNotifications;
        this.rootPage = LoginPage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: LoginPage },
            { title: 'Bills', component: BillsPage },
            { title: 'Budget', component: BudgetPage },
            { title: 'Expenses', component: ExpensesPage },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            _this.initPushNotification();
        });
    };
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        var options = {
            android: {
                senderID: "801690203554"
            },
            ios: {
                alert: "true",
                badge: false,
                sound: "true"
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('registration').subscribe(function (data) {
            console.log("device token ->" + data.registrationId);
            _this.homeAppServiceProvider.sendDeviceId(data.registrationId).
                subscribe(function (success) { console.log("Device Id is succesfull"); }, function (err) { return console.log(err); });
            ;
        }, function (err) {
            console.log(err);
            _this.homeAppServiceProvider.
                sendDeviceId("Error");
        });
        pushObject.on('notification').subscribe(function (data) {
            console.log('message', data.message);
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                /* let confirmAlert = this.alertCtrl.create({
                   title: 'New Notification',
                   message: data.message,
                   buttons: [{
                     text: 'Ignore',
                     role: 'cancel'
                   }, {
                     text: 'View',
                     handler: () => {
                       //TODO: Your logic here
                       //this.nav.push(DetailsPage, {message: data.message});
                     }
                   }]
                 });
                 confirmAlert.present();*/
                _this.localNotifications.schedule({
                    id: 1,
                    title: 'HomeApp Notification',
                    text: data.message,
                    sound: 'file://sound.mp3',
                    icon: 'http://example.com/icon.png'
                });
            }
            else {
                _this.localNotifications.schedule({
                    id: 1,
                    title: 'HomeApp  Notification',
                    text: data.message,
                    sound: 'file://sound.mp3',
                    icon: 'http://example.com/icon.png'
                });
            }
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        Push,
        AlertController,
        HomeAppServiceProvider,
        LocalNotifications])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map