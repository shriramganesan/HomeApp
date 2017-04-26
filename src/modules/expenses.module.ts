import { NgModule, ErrorHandler,ModuleWithProviders,ChangeDetectorRef } from '@angular/core';
import { BillsPage } from '../pages/expenses/bills/bills';
import {SmsExpensesPage} from '../pages/expenses/sms-expenses/sms-expenses';
import { BudgetPage } from '../pages/budget/budget';
import { ExpensesPage } from '../pages/expenses/expenses';
import { DashboardExpensesPage} from '../pages/expenses/dashboard-expenses/dashboard-expenses';
import { IonicModule } from 'ionic-angular';
import { GoogleMapsLatLng,GeocoderRequest,GeocoderResult,Geocoder,Camera, CameraOptions} from 'ionic-native';
import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_PIPES } from 'ionic2-auto-complete';
import { Geolocation } from '@ionic-native/geolocation';
import { Directive} from 'ionic2-input-mask';
import { CategoryServiceProvider } from '../providers/category-service';
import { BillServiceProvider} from '../providers/bill-service';
import { PROVIDERS_HOME_APP_EXPENSES,PROVIDERS_NATIVE_LOCATION,PROVIDERS_NATIVE_CAMERA } from '../constants/config';
@NgModule({
   imports : [IonicModule],
   declarations: [
    ExpensesPage,
    BillsPage,
    BudgetPage,
    SmsExpensesPage,
    DashboardExpensesPage,
    AUTOCOMPLETE_DIRECTIVES,
    AUTOCOMPLETE_PIPES,
    Directive,],   
   entryComponents : [ExpensesPage,BillsPage,BudgetPage,SmsExpensesPage,
   DashboardExpensesPage],   
   providers : [PROVIDERS_HOME_APP_EXPENSES,
   Geolocation,
   Geocoder,
   Camera,
   BillServiceProvider]
})
export class ExpensesModule{
}