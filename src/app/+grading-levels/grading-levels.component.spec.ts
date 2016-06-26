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
import { GradingLevelsComponent } from './grading-levels.component';

describe('Component: GradingLevels', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [GradingLevelsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([GradingLevelsComponent],
      (component: GradingLevelsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(GradingLevelsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(GradingLevelsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-grading-levels></app-grading-levels>
  `,
  directives: [GradingLevelsComponent]
})
class GradingLevelsComponentTestController {
}

