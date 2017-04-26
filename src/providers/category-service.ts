import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {AutoCompleteService} from 'ionic2-auto-complete';
import {SERVER_URL} from '../constants/config';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let catServiceUrl = SERVER_URL + '/homeapp/static';
@Injectable()
export class CategoryServiceProvider implements AutoCompleteService{
  labelAttribute = "categoryName";
  githubApiUrl = '';
  constructor(public http: Http,public alertCtrl:AlertController) { 
    catServiceUrl = SERVER_URL + '/homeapp/static'; 
  }
    getResults(keyword:string) {
          console.log(catServiceUrl);
          return this.http.get(catServiceUrl+"/category?keyword="+keyword)
            .map(
              result =>{
                return result.json()
                  .filter(item => item.categoryName.toLowerCase().startsWith(keyword.toLowerCase()) )
              });
    }
    getCategoryHints(keyword:string,size:number) : Observable<String[]>{
          console.log(catServiceUrl);
          return this.http.get(catServiceUrl+"/categoryHints?size="+size)
            .map(result =>result.json());
    }
}
