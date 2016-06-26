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
import { SubjectListComponent } from './subject-list.component';

describe('Component: SubjectList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SubjectListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SubjectListComponent],
      (component: SubjectListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SubjectListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SubjectListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-subject-list></app-subject-list>
  `,
  directives: [SubjectListComponent]
})
class SubjectListComponentTestController {
}

