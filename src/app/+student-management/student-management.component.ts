import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService} from '../+login/shared';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-student-management',
  templateUrl: 'student-management.component.html',
  styleUrls: ['student-management.component.css'],
  pipes: [Time],
  providers: [AuthService],
  directives: [CORE_DIRECTIVES]
})
export class StudentManagementComponent implements OnInit {
  base: string = "/dashboard/student-management";
  toggle: boolean = false;
  profile: any;
  constructor() {
  }

  ngOnInit() {

  }
}
