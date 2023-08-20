import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Router, Resolve } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  
  cityToCoordinate(parameters: any): Observable<HttpResponse<any>> {
    const header = {
      headers: new HttpHeaders({
        'X-Api-Key': 'UxLRSf95n1D1XJYV39tu5w==rBqJ87PKXsplTjLC'
      }),
      observe: 'response' as 'body'
    };
    let url =    "https://api.api-ninjas.com/v1/geocoding?city=" +
    parameters
    return this.http
      .get<any>(
    url,header
        )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  nearByPlace(lat,long,search,radius): Observable<HttpResponse<any>> {
    const header = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'fb843e60abmsh0e453652200e77ap1fdc57jsnc7e2fc9950fe',
        'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
      }),
      observe: 'response' as 'body'
    };
    let url =    `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat},${long}&type=${search}&radius=${radius}`
    return this.http
      .get<any>(
    url,header
        )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
