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
import { ClassRoomListComponent } from './class-room-list.component';
import { ClassRoom, ClassRoomService } from '../shared/index';
import {COMMON_PROVIDERS} from '../../shared/common-providers';
describe('Component: ClassRoomList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [COMMON_PROVIDERS,ClassRoomListComponent,ClassRoomService]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ClassRoomListComponent],
      (component: ClassRoomListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ClassRoomListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ClassRoomListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-class-room-list></app-class-room-list>
  `,
  directives: [ClassRoomListComponent]
})
class ClassRoomListComponentTestController {
}
