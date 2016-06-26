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
import { SubjectMarkListComponent } from './subject-mark-list.component';

describe('Component: SubjectMarkList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SubjectMarkListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SubjectMarkListComponent],
      (component: SubjectMarkListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SubjectMarkListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SubjectMarkListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-subject-mark-list></app-subject-mark-list>
  `,
  directives: [SubjectMarkListComponent]
})
class SubjectMarkListComponentTestController {
}

