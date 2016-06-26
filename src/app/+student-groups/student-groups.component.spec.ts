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
import { StudentGroupsComponent } from './student-groups.component';

describe('Component: StudentGroups', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [StudentGroupsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([StudentGroupsComponent],
      (component: StudentGroupsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(StudentGroupsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(StudentGroupsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-student-groups></app-student-groups>
  `,
  directives: [StudentGroupsComponent]
})
class StudentGroupsComponentTestController {
}

