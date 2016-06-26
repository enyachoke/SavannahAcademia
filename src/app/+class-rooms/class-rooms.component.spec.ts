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
import { ClassRoomsComponent } from './class-rooms.component';

describe('Component: ClassRooms', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ClassRoomsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ClassRoomsComponent],
      (component: ClassRoomsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ClassRoomsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ClassRoomsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-class-rooms></app-class-rooms>
  `,
  directives: [ClassRoomsComponent]
})
class ClassRoomsComponentTestController {
}

