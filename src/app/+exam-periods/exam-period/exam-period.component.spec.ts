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
import { ExamPeriodComponent } from './exam-period.component';

describe('Component: ExamPeriod', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ExamPeriodComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ExamPeriodComponent],
      (component: ExamPeriodComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ExamPeriodComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ExamPeriodComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-exam-periond></app-exam-periond>
  `,
  directives: [ExamPeriodComponent]
})
class ExamPeriodComponentTestController {
}
