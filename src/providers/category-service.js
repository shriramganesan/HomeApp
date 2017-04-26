var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../constants/config';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var catServiceUrl = SERVER_URL + '/homeapp/static/category?keyword=';
var CategoryServiceProvider = (function () {
    function CategoryServiceProvider(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.labelAttribute = "categoryName";
        this.githubApiUrl = '';
    }
    CategoryServiceProvider.prototype.getResults = function (keyword) {
        console.log(catServiceUrl);
        return this.http.get(catServiceUrl + keyword)
            .map(function (result) {
            return result.json()
                .filter(function (item) { return item.categoryName.toLowerCase().startsWith(keyword.toLowerCase()); });
        });
    };
    return CategoryServiceProvider;
}());
CategoryServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AlertController])
], CategoryServiceProvider);
export { CategoryServiceProvider };
//# sourceMappingURL=category-service.js.map