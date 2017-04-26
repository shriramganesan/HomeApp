import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { LoginPage } from '../pages/loginpage/loginpage';

//import { Page2 } from '../pages/page2/page2';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import { BillsPage } from '../pages/expenses/bills/bills';
import { BudgetPage } from '../pages/budget/budget';
import { ExpensesPage } from '../pages/expenses/expenses';
import { AlertController } from 'ionic-angular';
//import { RemindersPage } from '../pages/reminders/reminders';
//import { SettingsPage } from '../pages/settings/settings';
//import { SocialmediaPage } from '../pages/socialmedia/socialmedia';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public push: Push,
              public alertCtrl: AlertController,
              private localNotifications: LocalNotifications,
              public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Page1 },
      { title: 'Bills', component: BillsPage },
      { title: 'Budget', component: BudgetPage },
      { title: 'Expenses', component: ExpensesPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initPushNotification();
    });
  }
  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
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
    const pushObject: PushObject = this.push.init(options);
        pushObject.on('registration').subscribe((data: any) => {
        console.log("device token ->"+ data.registrationId);
        this.storage.ready().then(() => {
            this.storage.set("deviceId",data.registrationId);
            this.storage.remove('user');
        });

        console.log("Sending Tojen to Server.........");
      /*  this.homeAppServiceProvider.sendDeviceId(data.registrationId).
              subscribe((success) => {
                console.log("Device Id is succesfull")},
               

              (err) => console.log(err));;
        
         },(err) =>     {
           this.storage.set("deviceId","");
          console.log(err);*/
    });

    pushObject.on('notification').subscribe((data: any) => {
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
        this.localNotifications.schedule({
            id: 1,
            title: 'HomeApp Notification',
            text : data.message,
            sound: 'file://sound.mp3',
            icon: 'http://example.com/icon.png'
          });
      } else {
         this.localNotifications.schedule({
            id: 1,
            title: 'HomeApp  Notification',
            text : data.message,
            sound: 'file://sound.mp3',
            icon: 'http://example.com/icon.png'
          });
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
