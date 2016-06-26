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
import { GradingLevelListComponent } from './grading-level-list.component';

describe('Component: GradingLevelList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [GradingLevelListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([GradingLevelListComponent],
      (component: GradingLevelListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(GradingLevelListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(GradingLevelListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-grading-level-list></app-grading-level-list>
  `,
  directives: [GradingLevelListComponent]
})
class GradingLevelListComponentTestController {
}

