import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SavannahAcademiaAngularAppComponent } from '../app/savannah-academia-angular.component';

beforeEachProviders(() => [SavannahAcademiaAngularAppComponent]);

describe('App: SavannahAcademiaAngular', () => {
  it('should create the app',
      inject([SavannahAcademiaAngularAppComponent], (app: SavannahAcademiaAngularAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'savannah-academia-angular works!\'',
      inject([SavannahAcademiaAngularAppComponent], (app: SavannahAcademiaAngularAppComponent) => {
    expect(app.title).toEqual('savannah-academia-angular works!');
  }));
});
