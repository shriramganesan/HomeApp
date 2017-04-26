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
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../constants/config';
var loginServiceUrl = SERVER_URL + '/homeapp/loginService';
var LoginPageServiceProvider = (function () {
    function LoginPageServiceProvider(http) {
        this.http = http;
        console.log('Hello Loginpage Provider');
    }
    LoginPageServiceProvider.prototype.loginUser = function (user) {
        console.log(loginServiceUrl);
        var bodyString = JSON.stringify(user); // Stringify payload
        var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers });
        return this.http.post(loginServiceUrl + '/login', bodyString, options)
            .map(function (result) { return result.json(); })
            .catch(function (error) { return Observable.throw('Server error'); });
    };
    return LoginPageServiceProvider;
}());
LoginPageServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], LoginPageServiceProvider);
export { LoginPageServiceProvider };
//# sourceMappingURL=loginpage-service.js.map