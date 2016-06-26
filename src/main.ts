import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { SavannahAcademiaAngularAppComponent } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/shared/router-config';
import {provideForms} from '@angular/forms';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}
bootstrap(SavannahAcademiaAngularAppComponent, [
  provideForms(),
  // These are dependencies of our App
  ...HTTP_PROVIDERS,
  ...APP_ROUTER_PROVIDERS,
  ...ENV_PROVIDERS
])
  .catch(err => console.error(err));
