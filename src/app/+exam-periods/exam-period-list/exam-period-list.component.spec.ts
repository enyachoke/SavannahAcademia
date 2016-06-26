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
import { ExamPeriodListComponent } from './exam-period-list.component';

describe('Component: ExamPeriodList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ExamPeriodListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ExamPeriodListComponent],
      (component: ExamPeriodListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ExamPeriodListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ExamPeriodListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-exam-periond-list></app-exam-periond-list>
  `,
  directives: [ExamPeriodListComponent]
})
class ExamPeriodListComponentTestController {
}
