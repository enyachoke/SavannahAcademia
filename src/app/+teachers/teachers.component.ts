import { Component, OnInit } from '@angular/core';
import { TeacherService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-teachers',
  templateUrl: 'teachers.component.html',
  styleUrls: ['teachers.component.css'],
  providers: [
    TeacherService,
  ]
})
export class TeachersComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
