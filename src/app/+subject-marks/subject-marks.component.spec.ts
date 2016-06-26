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
import { SubjectMarksComponent } from './subject-marks.component';

describe('Component: SubjectMarks', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SubjectMarksComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SubjectMarksComponent],
      (component: SubjectMarksComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SubjectMarksComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SubjectMarksComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-subject-marks></app-subject-marks>
  `,
  directives: [SubjectMarksComponent]
})
class SubjectMarksComponentTestController {
}

