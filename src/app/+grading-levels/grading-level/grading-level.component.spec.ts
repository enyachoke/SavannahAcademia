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
import { GradingLevelComponent } from './grading-level.component';

describe('Component: GradingLevel', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [GradingLevelComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([GradingLevelComponent],
      (component: GradingLevelComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(GradingLevelComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(GradingLevelComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-grading-level></app-grading-level>
  `,
  directives: [GradingLevelComponent]
})
class GradingLevelComponentTestController {
}

