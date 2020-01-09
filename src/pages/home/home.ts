import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	weather:any;
  error:boolean = false;
  errorMessage:any = "Error occured while getting location";
	location: {
		city:string
	}

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private storage: Storage) { }

  ionViewWillEnter(){
    this.storage.get('location').then((val) => {
      if (val != null) { 
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Ilorin'
        }
      }

      this.weatherProvider.getWeather(this.location.city).subscribe(
        weather => {
          if (weather.cod == 200) { 
            this.weather = weather;
            this.error = false;
          } else if(weather.cod == 404) {
            this.error = true;
            this.weather = false;
          } else{
            this.error = true;
            this.weather = false;
          }
        },
        err => this.error = true,
        () => console.log()
      );
    });

  }

}
