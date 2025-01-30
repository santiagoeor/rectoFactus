import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MyInterceptor } from './http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      BrowserModule,
    )
  ]
};
