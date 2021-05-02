import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaylightResponse } from './daylight-response';

@Injectable({
  providedIn: 'root',
})
export class DaylightTimeService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://api.sunrise-sunset.org/json';

  getDaylightTime(
    latitude: String,
    longitude: String,
    date: String
  ): Observable<DaylightResponse> {
    let completeRequestUrl =
      this.apiUrl +
      '?lat=' +
      latitude +
      '&lng=' +
      longitude +
      '&date=' +
      date +
      '&formatted=0';
    console.log(completeRequestUrl);
    return this.http.get<DaylightResponse>(completeRequestUrl);
  }
}
