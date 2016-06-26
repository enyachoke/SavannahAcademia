import { Component, OnInit } from '@angular/core';
import { StudentService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.css'],
  providers: [
    StudentService,
  ]
})
export class StudentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
