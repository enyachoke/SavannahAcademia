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
import { SubjectMarkComponent } from './subject-mark.component';

describe('Component: SubjectMark', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SubjectMarkComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SubjectMarkComponent],
      (component: SubjectMarkComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SubjectMarkComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SubjectMarkComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-subject-mark></app-subject-mark>
  `,
  directives: [SubjectMarkComponent]
})
class SubjectMarkComponentTestController {
}

