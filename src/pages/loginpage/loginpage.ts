import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { Page1 } from '../page1/page1';
import { LoginPageServiceProvider } from '../../providers/loginpage-service';
import { AlertController,LoadingController,Loading } from 'ionic-angular';
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html'
})
export class LoginPage {
  private userLoginStorage : Observable<any>;
  loading: Loading;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public storage: Storage,
  	public loginPageSP:LoginPageServiceProvider,
  	public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  		this.userLoginStorage = Observable.fromPromise(this.storage.get("user"));
      this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }
  showLoading() {
    
    this.loading.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }
  login(){
        let user = 
        {"email":"shriram.ganesan@gmail.com",
  			"idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjOTE1NzZmYzkzZGYzYWRjNTk4OTZjNDk1Y2I2NzI5ZGQ1YmMwMjMifQ.eyJhenAiOiI4MDE2OTAyMDM1NTQtc2FrM3BqZG9la2Q5dTUzYTk5cXN1ZzZucTNnYmtnaDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4MDE2OTAyMDM1NTQtYTY2czFxcDU3OW0ydmJxNGdjbGQ2NjBhcGhyNjl0NmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMyNDc1MTEwNzc1MDU3ODg4NzUiLCJlbWFpbCI6InNocmlyYW0uZ2FuZXNhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDkyMzcyMDc5LCJleHAiOjE0OTIzNzU2NzksIm5hbWUiOiJzaHJpcmFtIGdhbmVzYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01dFhkNU0zREE1Zy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFCcy8yY1FLVUppREpxay9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoic2hyaXJhbSIsImZhbWlseV9uYW1lIjoiZ2FuZXNhbiIsImxvY2FsZSI6ImVuIn0.bfOHCMTY0Vdg8ue39la5-GXsPzXRPKB2Vw2EHjMIO9kFVCPcis2SF_uca9KLZus8RlF55T09ol1kC61KYQ0hW85eWR1Be08E4lZXbFA9hsIs5AX45kAsiVJIRLOThHxLAXV2ew8lQ2VbA66op7Evcz2A42d521iAwk4xZlUJSn2laJ9rGvKDCl7tsk_uKbI7T7LUTvnABk_cfCx8dxBBCutkHiZ1PXJ91KoNuNUc9kv3WSfD58EO5lxsUQhO5ygS_wk0ZY9W1PrhaZRx2ezHrQaQyUozaHQb5DbpQ_8b8aJJ8HsMVU4OVHtwNjc4f1ysYR9pHZT5jGduRSmZ49UR1A",
  			"userId":"103247511077505788875",
  			"displayName":"shriram ganesan",
  			"familyName":"ganesan",
  			"givenName":"shriram",
  			"imageUrl":"https://lh6.googleusercontent.com/-5tXd5M3DA5g/AAAAAAAAAAI/AAAAAAAAABs/2cQKUJiDJqk/s96-c/photo.jpg"
		};
    this.showLoading();
    this.storeLocalStorage(user);
     /*this.storage.get("deviceId")
          .then(
            (deviceId) => user['deviceId'] = deviceId,
            (err) => console.log(err)
      );
    */
  		/*this.loginPageSP.loginUser(user).subscribe(
            	success => {
            			this.storeLocalStorage(user);
            	},
            	err => {
            		console.log("Error=========================================================");
            		this.showLoginError("101");
            	}
            );  */
      
        /*GooglePlus.login({
           'webClientId': '801690203554-a66s1qp579m2vbq4gcld660aphr69t6k.apps.googleusercontent.com',
           'offline': true
        }).then((user) => {
            console.log("Success=========================================================");
            this.storage.get("deviceId")
              .then(
                (deviceId) =>{
                    user['deviceId'] = deviceId
                    console.log(JSON.stringify(user));
                      this.loginPageSP.loginUser(user).subscribe(
                        success => {
                            this.storeLocalStorage(user);
                        },
                        err => {
                          console.log("Error=========================================================");
                          this.loading.dismiss();
                          this.showLoginError("101");
                          
                        }
                      ); 
                } ,
                (err) => {
                  console.log(err)
                }
            );
                     
        }, (err) => {
            console.log("Error=========================================================");
            console.log(err);
            this.showLoginError("100");
            this.loading.dismiss();
        }); */
  }
  storeLocalStorage(user){
  		 	this.storage.set("user",{
		      name: user.displayName,
		      email: user.email,
		      picture: user.imageUrl,
          displayName : user.displayName
		    })
		    .then(() => {
           setTimeout(() => {
               this.loading.dismiss();
               this.navCtrl.setRoot(Page1)
            });  
        })
		    .catch(err => {
		    	console.log(err); 
		    	this.showLoginError("102");
		    });
  }
  showLoginError(errorCode){
         setTimeout(() => {
            this.loading.dismiss();
         });
  			 let alert = this.alertCtrl.create({
              title: 'Error : Login',
              subTitle: "Error Code: " + errorCode,
              buttons: ['OK']
            });
            alert.present(); 
  }
  logout(){ 
        GooglePlus.logout().then(() => {
            console.log("logged out");
            this.storage.remove('user');
    		//this.navCtrl.push(LoginPage);
        }); 
    }
}
