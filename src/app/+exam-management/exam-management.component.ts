import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService} from '../+login/shared';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-exam-management',
  templateUrl: 'exam-management.component.html',
  styleUrls: ['exam-management.component.css'],
  pipes: [Time],
  providers: [AuthService],
  directives: [CORE_DIRECTIVES]
})
export class ExamManagementComponent implements OnInit {
  base: string = "/dashboard/exam-management";
  toggle: boolean = false;
  profile: any;
  constructor() {
  }

  ngOnInit() {

  }
}
