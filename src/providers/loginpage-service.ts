import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {SERVER_URL} from '../constants/config';

let loginServiceUrl = SERVER_URL + '/homeapp/loginService';
@Injectable()
export class LoginPageServiceProvider {

  constructor(public http: Http) {
    console.log('Hello Loginpage Provider');
  }
  public loginUser(user) : Observable<any> {
      console.log(loginServiceUrl)
  	  let bodyString =   JSON.stringify(user); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });
      return this.http.post(loginServiceUrl+'/login',bodyString,options)
                         .map((result) => result.json())
                         .catch((error:any) => Observable.throw('Server error'));
  }
}
