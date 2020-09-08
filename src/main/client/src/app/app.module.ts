import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcoPoloComponent } from './marco-polo/marco-polo.component';
import { HomeComponent } from './home/home.component';
import { MarcoPoloSockjsComponent } from './marco-polo-sockjs/marco-polo-sockjs.component';

@NgModule({
  declarations: [
    AppComponent,
    MarcoPoloComponent,
    HomeComponent,
    MarcoPoloSockjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
