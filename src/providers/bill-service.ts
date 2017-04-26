import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable,BehaviorSubject } from 'rxjs/Rx';
import {BillEntry} from '../model/BillEntry';

import {SERVER_URL} from '../constants/config';
/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let billServiceUrl = SERVER_URL + '/homeapp/bills';
let sanityUrl = SERVER_URL + '/homeapp/health/sanity';

@Injectable()
export class BillServiceProvider {
  billsLot: Observable<BillEntry[]>	
  private _bills: BehaviorSubject<BillEntry[]>; 
  private dataStore: {  // This is where we will store our data in memory
    bills: BillEntry[]
  };
  constructor(public http: Http) {
    console.log('Hello BillService Provider');
    this.dataStore = { bills: [] };
    this._bills = <BehaviorSubject<BillEntry[]>>new BehaviorSubject([]);
    this.billsLot = this._bills.asObservable();

  }
  
  loadAll() {
    this.http.get(billServiceUrl+'/getBills').map(response => response.json())
    .subscribe(data => {
      console.log(data);
      this.dataStore.bills = data;
      this._bills.next(Object.assign({}, this.dataStore).bills);
    }, error => console.log('Could not load bills.'));
  }
  deleteBill(bill : any){
      console.log("delete Bill service"+billServiceUrl)
      let deleteBill = new BillEntry();
      deleteBill.id = bill.id;
      deleteBill.loginEntity = [];
      deleteBill.loginEntity.email = bill.loginEntity?bill.loginEntity.email:"";
  	  let bodyString    =   JSON.stringify(deleteBill); // Stringify payload
      let headers       = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });
  	  return this.http.post(billServiceUrl+'/deleteBill',bodyString,options)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw('Server error'));
  }
  updateBill(bill : any){
  	  let bodyString    =   JSON.stringify(bill); // Stringify payload
      let headers       = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });
  	  return this.http.post(billServiceUrl+'/updateBill',bodyString,options)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw('Server error'));
  }
}
