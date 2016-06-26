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
import { StudentGroupListComponent } from './student-group-list.component';

describe('Component: StudentGroupList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [StudentGroupListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([StudentGroupListComponent],
      (component: StudentGroupListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(StudentGroupListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(StudentGroupListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-student-group-list></app-student-group-list>
  `,
  directives: [StudentGroupListComponent]
})
class StudentGroupListComponentTestController {
}

