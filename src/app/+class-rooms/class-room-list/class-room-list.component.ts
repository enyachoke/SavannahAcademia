import { Component, OnInit } from '@angular/core';
import { ClassRoom, ClassRoomService } from '../shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-class-room-list',
  templateUrl: 'class-room-list.component.html',
  styleUrls: ['class-room-list.component.css'],
  directives: [],
})
export class ClassRoomListComponent implements OnInit {

  error: any;
  classRooms: ClassRoom[];
  getClassRooms() {
    this.classRoomService.getAll().subscribe(classRooms => this.classRooms = classRooms);
  }
  constructor(private classRoomService: ClassRoomService) { }

  ngOnInit() {
    this.getClassRooms();
  }
  delete(classRoom: ClassRoom, event: any) {
    event.stopPropagation();
    this.classRoomService
      .delete(classRoom)
      .subscribe(res => {
      console.log(res);
      this.classRooms = this.classRooms.filter(h => h !== classRoom);
    }, error => this.error = error);
  }

}
