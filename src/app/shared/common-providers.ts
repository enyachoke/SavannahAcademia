import { HTTP_PROVIDERS, XHRBackend, Http, RequestOptions, BrowserXhr} from '@angular/http';
import { provide} from '@angular/core';
import { Router} from '@ngrx/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {HttpInterceptor} from '../shared/http';
import {ProgressBarHttpInterceptorService} from '../shared/progress-bar-http-interceptor.service';
import {WidgetComponent} from '../shared/widget/index';
import {CustomBrowserXhr} from '../shared/custom-xhr';
import {SlimLoadingBarService, SlimLoadingBar} from 'ng2-slim-loading-bar/ng2-slim-loading-bar';
import {ToastyService, ToastyConfig, Toasty, ToastData, ToastOptions} from '../shared/components';
export const COMMON_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  provide(BrowserXhr, { useClass: CustomBrowserXhr }),
  SlimLoadingBarService,
  provide(Http, {
    useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions,
      router: Router) => new ProgressBarHttpInterceptorService(xhrBackend, requestOptions, router),
    deps: [XHRBackend, RequestOptions, Router]
  })
  ,
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
  ToastyService, ToastyConfig,
];
