import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms'
import { BillsPage } from '../bills/bills';
import { BudgetPage } from '../budget/budget';
/*
  Generated class for the Expenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {
  smsPage = BillsPage;
  newBillPage = BudgetPage;
  private bills : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
  	this.bills = this.formBuilder.group({              
        'amount': ['', Validators.compose([Validators.required,Validators.maxLength(3), Validators.pattern('\d+(\.\d{1,2})?')])],

        'billDateTime': ['', Validators.required],
        'description': [''],
            });   


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesPage');
  }

}
