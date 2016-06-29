import { Component, provide, ViewContainerRef} from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, Http, RequestOptions} from '@angular/http';
import { Router} from '@ngrx/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {HttpInterceptor} from './shared/http';
import {WidgetComponent} from './shared/widget/index';
import './rxjs-operators';
import {ToastyService, ToastyConfig} from './shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-savannah-academia-angular-app',
  templateUrl: 'savannah-academia-angular.component.html',
  styleUrls: ['savannah-academia-angular.component.css'],
  directives: [WidgetComponent],
  providers: [HTTP_PROVIDERS,
    provide(Http, {
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions,
        router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
      deps: [XHRBackend, RequestOptions, Router]
    }),
    AUTH_PROVIDERS,
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          tokenName: 'auth_token',
          noJwtError: true,
          globalHeaders: [{ 'Content-Type': 'application/json' }]
        }), http);
      },
      deps: [Http]
    }),
    ToastyService, ToastyConfig
  ]
})
export class SavannahAcademiaAngularAppComponent {
  title = 'Savannah Academia';
  constructor(private viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
