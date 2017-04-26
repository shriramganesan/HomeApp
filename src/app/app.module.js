var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BillsPage } from '../pages/bills/bills';
import { BudgetPage } from '../pages/budget/budget';
import { ExpensesPage } from '../pages/expenses/expenses';
import { RemindersPage } from '../pages/reminders/reminders';
import { SettingsPage } from '../pages/settings/settings';
import { SocialmediaPage } from '../pages/socialmedia/socialmedia';
import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_PIPES } from 'ionic2-auto-complete';
import { Geolocation } from '@ionic-native/geolocation';
import { Directive } from 'ionic2-input-mask';
import { Geocoder, Camera } from 'ionic-native';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from "@ionic-native/push";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LoginPage } from '../pages/loginpage/loginpage';
import { CategoryServiceProvider } from '../providers/category-service';
import { HomeAppServiceProvider } from '../providers/homeapp-service';
import { LoginPageServiceProvider } from '../providers/loginpage-service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            Page1,
            Page2, LoginPage,
            BillsPage, BudgetPage, ExpensesPage, RemindersPage, SettingsPage, SocialmediaPage,
            AUTOCOMPLETE_DIRECTIVES,
            AUTOCOMPLETE_PIPES,
            Directive
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot({
                name: '__mydbName',
                driverOrder: ['sqlite', 'indexeddb', 'websql']
            })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            Page1,
            Page2,
            BillsPage, BudgetPage, ExpensesPage, RemindersPage, SettingsPage, SocialmediaPage, LoginPage
        ],
        providers: [LoginPageServiceProvider, LocalNotifications, Push, HomeAppServiceProvider, CategoryServiceProvider, Geolocation, Geocoder, Camera, LoadingController, IonicStorageModule,
            { provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map