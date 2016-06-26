import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExamPeriodsComponent } from './exam-periods.component';

describe('Component: ExamPeriods', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ExamPeriodsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ExamPeriodsComponent],
      (component: ExamPeriodsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ExamPeriodsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ExamPeriodsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-exam-periods></app-exam-periods>
  `,
  directives: [ExamPeriodsComponent]
})
class ExamPeriodsComponentTestController {
}

