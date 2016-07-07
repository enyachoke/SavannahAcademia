import { Component, provide, ViewContainerRef, OnInit} from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, Http, RequestOptions} from '@angular/http';
import { Router} from '@ngrx/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {HttpInterceptor} from './shared/http';
import {ProgressBarHttpInterceptorService} from './shared/progress-bar-http-interceptor.service';
import {WidgetComponent} from './shared/widget/index';
import './rxjs-operators';
import {ToastyService, ToastyConfig, Toasty, ToastData, ToastOptions} from './shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-savannah-academia-angular-app',
  templateUrl: 'savannah-academia-angular.component.html',
  styleUrls: ['savannah-academia-angular.component.css'],
  directives: [WidgetComponent, Toasty],
  providers: [HTTP_PROVIDERS,
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
    ToastyService, ToastyConfig
  ]
})
export class SavannahAcademiaAngularAppComponent implements OnInit {
  protected progressBarVisible: boolean = false;
  title = 'Savannah Academia';
  constructor(private viewContainerRef: ViewContainerRef, private http: Http, private toastyService: ToastyService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
  public ngOnInit(): void {
    // We will override the usual Http provider in the app bootstrap, but use a
    // cast here so we can use the subclass's functionality
    (<ProgressBarHttpInterceptorService>this.http)
      .subscribeToProgressEvents((progress: number) => {
      if (progress === 1) {
        // Requests have completed -- hide progress bar
        this.hideProgressBar();
      } else {
        // Some requests still in progress -- progress bar remains visible
        this.showProgressBar();
      }
    });
  }
  private hideProgressBar(): void {
    this.progressBarVisible = false;
    this.toastyService.clearAll();
  }

  private showProgressBar(): void {
    this.progressBarVisible = true;
    this.toastyService.clearAll();
    this.addToast();
  }
  addToast() {
    let toastOptions: ToastOptions = {
      title: "",
      msg: "Hang Tight............",
      showClose: false,
      timeout: false,
      theme: 'bootstrap'
    };
    this.toastyService.wait(toastOptions);
  }
}
