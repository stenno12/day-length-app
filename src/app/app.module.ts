import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DaylightTimeComponent } from './daylight-time/daylight-time.component';
import { HttpClientModule } from '@angular/common/http';

import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [AppComponent, DaylightTimeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
