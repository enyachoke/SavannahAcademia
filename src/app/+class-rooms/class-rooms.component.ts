import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-class-rooms',
  templateUrl: 'class-rooms.component.html',
  styleUrls: ['class-rooms.component.css'],
  directives: [],
  providers: [
    ClassRoomService,
  ]
})
export class ClassRoomsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
