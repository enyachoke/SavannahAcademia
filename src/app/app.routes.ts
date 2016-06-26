import { provideRouter, Routes } from '@ngrx/router';
export const routes: Routes = [
  {
    path: '/',
    loadComponent: () => new Promise(resolve => {
      require.ensure([], rq => {
        resolve(require('./home').HomeComponent);
      });
    }),
  },
  {
    path: '/about',
    loadComponent: () => new Promise(resolve => {
      require.ensure([], rq => {
        resolve(require('./about').AboutComponent);
      });
    }),
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
