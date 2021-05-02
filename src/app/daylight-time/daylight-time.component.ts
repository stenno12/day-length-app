import { Component, OnInit } from '@angular/core';
import { DaylightTimeService } from '../daylight-time.service';
import * as L from 'leaflet';
import * as SunCalc from 'suncalc';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-daylight-time',
  templateUrl: './daylight-time.component.html',
  styleUrls: ['./daylight-time.component.css'],
})
export class DaylightTimeComponent implements OnInit {
  constructor(private daylightTimeService: DaylightTimeService) {}

  map: any;

  latitude: any = '';
  longitude: any = '';
  date: string = '';
  endDate: string = '';

  daylightTimeHours: string = '';
  sunrise: string = '';
  sunset: string = '';

  useDateRange: boolean = false;
  isGraphVisible: boolean = false;

  /* graph info: */
  type = ChartType.ColumnChart;
  data: (string | number)[][] = [];
  chartColumns = ['Date', 'Hours'];
  title = 'hours';
  options = {};
  width = 1500;
  height = 400;

  ngOnInit() {
    this.initMap();

    this.map.on('click', (e: any) => {
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;
    });
  }

  initMap() {
    this.map = L.map('mapId').setView([58.3649315, 26.7412827], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  onSubmit() {
    this.daylightTimeHours = '';
    this.sunrise = '';
    this.sunset = '';

    if (isNaN(this.latitude) || this.latitude === '') {
      alert('Latitude incorrect');
      return;
    }
    if (isNaN(this.longitude) || this.longitude === '') {
      alert('Longitude incorrect');
      return;
    }
    if (this.date === '') {
      alert('Select date');
      return;
    }

    if (!this.useDateRange) {
      this.isGraphVisible = false;
      this.populateSingleDayFields();
    } else {
      if (this.endDate === '') {
        alert('Select end date');
        return;
      }
      this.data = this.getGraphData();
      this.isGraphVisible = true;
    }
  }

  populateSingleDayFields() {
    this.daylightTimeService
      .getDaylightTime(this.latitude, this.longitude, this.date)
      .subscribe((daylightResponse) => {
        if (
          daylightResponse.results.sunrise === '1970-01-01T00:00:01+00:00' &&
          daylightResponse.results.day_length === 0
        ) {
          this.daylightTimeHours = '24' + 'h';
          this.sunrise = 'The Midnight Sun';
          this.sunset = 'The Midnight Sun';
        } else if (daylightResponse.results.day_length === 0) {
          this.daylightTimeHours = '0' + 'h';
          this.sunrise = 'Polar Night';
          this.sunset = 'Polar Night';
        } else {
          this.daylightTimeHours =
            (daylightResponse.results.day_length / 3600).toFixed(2) + 'h';

          this.sunrise =
            daylightResponse.results.sunrise.substring(0, 10) +
            ' ' +
            daylightResponse.results.sunrise.substring(11, 16) +
            ' UTC';

          this.sunset =
            daylightResponse.results.sunset.substring(0, 10) +
            ' ' +
            daylightResponse.results.sunset.substring(11, 16) +
            ' UTC';
        }
      });
  }

  getDaysArray(start: Date, end: Date) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr.map((v) => v.toISOString().slice(0, 10));
  }

  calculateDaylightHours(date: string) {
    let year = parseInt(date.substring(0, 4));
    let month = parseInt(date.substring(5, 7));
    let day = parseInt(date.substring(8, 10));
    let times = SunCalc.getTimes(
      new Date(Date.UTC(year, month - 1, day)),
      parseInt(this.latitude),
      parseInt(this.longitude)
    );
    let sunrise = times.sunrise.getTime();
    let sunset = times.sunset.getTime();
    let daylightTimeHours = (sunset - sunrise) / (1000 * 60 * 60);

    return daylightTimeHours;
  }

  getGraphData() {
    let data: (string | number)[][] = [];
    this.getDaysArray(
      new Date(this.date + 'T03:00:00'),
      new Date(this.endDate + 'T03:00:00')
    ).forEach((date) => {
      data.push([date.substring(5), this.calculateDaylightHours(date)]);
    });

    return data;
  }
}
