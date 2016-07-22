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
import { ClassRoomComponent } from './class-room.component';
import { ClassRoom, ClassRoomSubject, ClassRoomService, ClassRoomSubjectService } from '../shared/index';
import {COMMON_PROVIDERS} from '../../shared/common-providers';
describe('Component: ClassRoom', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [COMMON_PROVIDERS, ClassRoomComponent, ClassRoomService, ClassRoomSubjectService]);
  beforeEach(inject([TestComponentBuilder], function(tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ClassRoomComponent],
    (component: ClassRoomComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ClassRoomComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
      let query = fixture.debugElement.query(By.directive(ClassRoomComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-class-room></app-class-room>
  `,
  directives: [ClassRoomComponent]
})
class ClassRoomComponentTestController {
}
