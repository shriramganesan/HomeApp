import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
import { GithubUsers } from '../providers/github-users';

import {Directive} from 'ionic2-input-mask';
@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BillsPage,BudgetPage,ExpensesPage,RemindersPage,SettingsPage,SocialmediaPage,
    AUTOCOMPLETE_DIRECTIVES,
    AUTOCOMPLETE_PIPES,
    Directive
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    BillsPage,BudgetPage,ExpensesPage,RemindersPage,SettingsPage,SocialmediaPage
  ],
  providers: [GithubUsers,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
