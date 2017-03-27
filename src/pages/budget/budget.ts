import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AUTOCOMPLETE_DIRECTIVES } from 'ionic2-auto-complete';
import {  GithubUsers } from '../../providers/github-users';

/*
  Generated class for the Budget page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
  providers : [AUTOCOMPLETE_DIRECTIVES,GithubUsers]
})
export class BudgetPage {
     @ViewChild('searchbar') searchbar: any;
    public promise : any; 
    private bills : FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,
    private githubUsers: GithubUsers) {
           this.bills = this.formBuilder.group({              
            'amount': ['', Validators.compose([Validators.required,Validators.maxLength(10), Validators.pattern(/^\d+([.,]\d{1,2})?$/)])],
            'billDateTime': ['', Validators.required],
            'description': ['',Validators.compose([Validators.maxLength(255)])],
            });    
  
  
  }
  logForm(){
    console.log(this.bills.value); 
    console.log(this.searchbar.getValue())
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
       this.promise = new Promise((resolve,reject) => {
               setTimeout( () =>{
                   resolve(42);
               },5000);     
            
            console.log("I am starting");
      });
      this.promise.then(x => console.log(x));
  }

}
