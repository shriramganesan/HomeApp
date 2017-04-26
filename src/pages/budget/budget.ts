import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AUTOCOMPLETE_DIRECTIVES } from 'ionic2-auto-complete';
import {  CategoryServiceProvider } from '../../providers/category-service';
import {  HomeAppServiceProvider } from '../../providers/homeapp-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {  GoogleMapsLatLng,GeocoderRequest,GeocoderResult,Geocoder ,Camera, CameraOptions,GeolocationOptions } 
from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Diagnostic } from 'ionic-native';
import * as moment from "moment";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Budget page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
 */
declare var window: any;
declare var hash : any;

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
  providers : [AUTOCOMPLETE_DIRECTIVES,CategoryServiceProvider]
})
export class BudgetPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     
  }
  
}
