import { Component, OnInit } from '@angular/core';
import { StudentGroupService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-student-groups',
  templateUrl: 'student-groups.component.html',
  styleUrls: ['student-groups.component.css'],
  providers: [
    StudentGroupService,
  ]
})
export class StudentGroupsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
