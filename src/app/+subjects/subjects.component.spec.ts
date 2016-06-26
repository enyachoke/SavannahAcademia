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
import { SubjectsComponent } from './subjects.component';

describe('Component: Subjects', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SubjectsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SubjectsComponent],
      (component: SubjectsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SubjectsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SubjectsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-subjects></app-subjects>
  `,
  directives: [SubjectsComponent]
})
class SubjectsComponentTestController {
}

