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
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../constants/config';
/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var modeServiceUrl = SERVER_URL + '/homeapp/static/modeOfPayment';
var billServiceUrl = SERVER_URL + '/homeapp/bills/';
var sanityUrl = SERVER_URL + '/homeapp/health/sanity';
//let propertiesURL = "/api/homeapp/static/modeOfPayment";
var HomeAppServiceProvider = (function () {
    function HomeAppServiceProvider(http) {
        this.http = http;
    }
    HomeAppServiceProvider.prototype.sendDeviceId = function (deviceId) {
        console.log(billServiceUrl + 'device');
        var data = new URLSearchParams();
        data.append('deviceId', deviceId);
        return this.http.post(billServiceUrl + 'device', data)
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw(JSON.stringify(error) + ' Server error'); });
    };
    HomeAppServiceProvider.prototype.checkServerConnection = function () {
        return this.http.get(sanityUrl)
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw('Server not started'); });
        /* return Observable.interval(2000)
               .switchMap(() => this.http.get(sanityUrl).map(res => res.json()));*/
    };
    HomeAppServiceProvider.prototype.getModesOfPayment = function () {
        console.log(modeServiceUrl);
        return this.http.get(modeServiceUrl)
            .map(function (result) { return result.json(); })
            .map(function (items) { return items.map(function (i) { return i.modeOfPayment; }); })
            .catch(function (error) { return Observable.throw(error.json() || error + 'Server error'); });
    };
    HomeAppServiceProvider.prototype.submitBillsData = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers });
        console.log(billServiceUrl);
        return this.http.post(billServiceUrl + 'submit', bodyString, options)
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Server error'); });
    };
    HomeAppServiceProvider.prototype.syncLocalBillData = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers });
        console.log(billServiceUrl);
        var newArr = [];
        body.map(function (item) { return newArr.push(JSON.parse(item)); });
        return this.http.post(billServiceUrl + 'syncLocalBilldata', newArr, options)
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Server error'); });
    };
    HomeAppServiceProvider.prototype.getBillsData = function () {
        return this.http.get(billServiceUrl + 'getBills')
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw(error.json() || error + 'Server error'); });
    };
    return HomeAppServiceProvider;
}());
HomeAppServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HomeAppServiceProvider);
export { HomeAppServiceProvider };
//# sourceMappingURL=homeapp-service.js.map