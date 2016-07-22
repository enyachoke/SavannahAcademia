import { Component, provide, ViewContainerRef, OnInit} from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, Http, RequestOptions, BrowserXhr} from '@angular/http';
import { Router} from '@ngrx/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {HttpInterceptor} from './shared/http';
import {ProgressBarHttpInterceptorService} from './shared/progress-bar-http-interceptor.service';
import {WidgetComponent} from './shared/widget/index';
import {CustomBrowserXhr} from './shared/custom-xhr';
import {COMMON_PROVIDERS} from './shared/common-providers';
import {SlimLoadingBarService, SlimLoadingBar} from 'ng2-slim-loading-bar/ng2-slim-loading-bar';
import './rxjs-operators';
import {ToastyService, ToastyConfig, Toasty, ToastData, ToastOptions} from './shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-savannah-academia-angular-app',
  templateUrl: 'savannah-academia-angular.component.html',
  styleUrls: ['savannah-academia-angular.component.css'],
  directives: [WidgetComponent, Toasty, SlimLoadingBar],
  providers: [COMMON_PROVIDERS]
})
export class SavannahAcademiaAngularAppComponent implements OnInit {
  protected progressBarVisible: boolean = false;
  title = 'Savannah Academia';
  constructor(private viewContainerRef: ViewContainerRef, private http: Http, private slimLoadingBarService: SlimLoadingBarService) {
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
    this.completeProgress();
  }

  private showProgressBar(): void {
    this.progressBarVisible = true;
    this.startLoading();
  }
  startLoading() {
    // We can listen when loading will be completed
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
  }
  completeProgress() {
    this.slimLoadingBarService.complete();
  }
}
