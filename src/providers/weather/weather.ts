import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apiKey = "79730c645e8981ff6b98876765d12388";
	url;

  constructor(public http: Http) {
    this.url = "http://api.openweathermap.org/data/2.5/weather?q="
  }


  getWeather(city){
  	return this.http.get(this.url+city+'&APPID='+this.apiKey)
  		.map(res => res.json());
  }

}

