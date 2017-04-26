import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {SERVER_URL} from '../constants/config';
/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let staticServiceUrl = SERVER_URL + '/homeapp/static';
let billServiceUrl = SERVER_URL + '/homeapp/bills/';
let sanityUrl = SERVER_URL + '/homeapp/health/sanity';
//let propertiesURL = "/api/homeapp/static/modeOfPayment";
@Injectable()
export class HomeAppServiceProvider {

  

  constructor(public http: Http) {  }
   public sendDeviceId(deviceId) : Observable<any>{
     console.log(billServiceUrl+'device');
      let data = new URLSearchParams();
      data.append('deviceId', deviceId);
      return this.http.post(billServiceUrl+'device',data)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw(JSON.stringify(error)+' Server error'));

  }
  public checkServerConnection() : Observable<any>{
      return this.http.get(sanityUrl)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw('Server not started'));
       /* return Observable.interval(2000)
              .switchMap(() => this.http.get(sanityUrl).map(res => res.json()));*/

  }
  public getLocationHints(keyword:string,size:number) : Observable<String[]>{
          console.log(staticServiceUrl);
          return this.http.get(staticServiceUrl+"/locationHints?size="+size)
            .map(result =>result.json());
  }
  public getShopHints(keyword:string,size:number) : Observable<String[]>{
          console.log(staticServiceUrl);
          return this.http.get(staticServiceUrl+"/shopHints?size="+size)
            .map(result =>result.json());
   }
  public getModesOfPayment() : Observable<String[]>{
      console.log(staticServiceUrl);
      return this.http.get(staticServiceUrl+'/modeOfPayment')
                         .map((result) => result.json())
                         .map(items => items.map(i => {return i.modeOfPayment}))
                         .catch((error:any) => Observable.throw(error.json() || error+'Server error'));


  }
  public submitBillsData(body : any) : Observable<String>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });
      console.log(billServiceUrl);
      return this.http.post(billServiceUrl+'submit',bodyString,options)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw(error.json() || 'Server error'));


  }
  public syncLocalBillData(body : any) : Observable<String>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });
      console.log(billServiceUrl);
      let newArr = [];
      body.map( item => newArr.push(JSON.parse(item)));
      return this.http.post(billServiceUrl+'syncLocalBilldata',newArr,options)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw(error.json() || 'Server error'));


  }
  public getBillsData() : Observable<any>{
     return this.http.get(billServiceUrl+'getBills')
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw(error.json() || error+'Server error'));


  }
}
