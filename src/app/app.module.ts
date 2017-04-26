import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler,LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { IonicStorageModule} from '@ionic/storage'
import { Push} from "@ionic-native/push";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LoginPage } from '../pages/loginpage/loginpage';
import { LoginPageServiceProvider } from '../providers/loginpage-service';
import { ExpensesModule} from '../modules/expenses.module';
import { HomeAppServiceProvider} from '../providers/homeapp-service';
import { CategoryServiceProvider } from '../providers/category-service';
@NgModule({
  declarations: [
    MyApp,
    Page1,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydbName',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    ExpensesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    LoginPage
  ],
  providers: [
  HomeAppServiceProvider,CategoryServiceProvider,
  LoginPageServiceProvider,
  LocalNotifications,
  Push,
  LoadingController,
  IonicStorageModule,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
