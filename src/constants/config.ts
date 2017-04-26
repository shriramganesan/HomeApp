import { AlertController,LoadingController,NavController, NavParams } from 'ionic-angular';
import { Component ,Provider} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CategoryServiceProvider } from '../providers/category-service';
import { HomeAppServiceProvider} from '../providers/homeapp-service';
import { LoginPageServiceProvider } from '../providers/loginpage-service';
import { GoogleMapsLatLng,Geocoder,Camera} from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';

export const DEFAULT_COMPONENTS_IMPORTS = [ AlertController, Observable,LoadingController,NavController, NavParams,Component ];
export const PROVIDERS_HOME_APP_EXPENSES  = [
	{provide: HomeAppServiceProvider, useClass: HomeAppServiceProvider},
	{provide: CategoryServiceProvider, useClass: CategoryServiceProvider}		
]
export const PROVIDERS_HOME_APP_LOGIN  = [
	{provide: HomeAppServiceProvider, useClass: HomeAppServiceProvider}		
]
export const PROVIDERS_NATIVE_LOCATION =   [
	{provide: GoogleMapsLatLng, useClass: GoogleMapsLatLng},
	{provide: Geocoder, useClass: Geocoder},
	{provide: Geolocation, useClass: Geolocation}		
];
export const PROVIDERS_NATIVE_CAMERA =     [ {provide: Camera, useClass: Camera}];
export let SERVER_URL = "http://192.168.0.5:8080";
//export let SERVER_URL = "http://homeapp.ap-south-1.elasticbeanstalk.com";
//export let SERVER_URL = "/api";
