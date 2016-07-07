import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService} from '../+login/shared';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-staff-management',
  templateUrl: 'staff-management.component.html',
  styleUrls: ['staff-management.component.css'],
  pipes: [Time],
  providers: [AuthService],
  directives: [CORE_DIRECTIVES]
})
export class StaffManagementComponent implements OnInit {
  base: string = "/dashboard/staff-management";
  toggle: boolean = false;
  profile: any;
  constructor() {
  }

  ngOnInit() {

  }
}
