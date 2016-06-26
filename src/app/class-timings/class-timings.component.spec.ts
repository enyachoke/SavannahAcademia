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
import { ClassTimingsComponent } from './class-timings.component';

describe('Component: ClassTimings', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ClassTimingsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ClassTimingsComponent],
      (component: ClassTimingsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ClassTimingsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ClassTimingsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-class-timings></app-class-timings>
  `,
  directives: [ClassTimingsComponent]
})
class ClassTimingsComponentTestController {
}

