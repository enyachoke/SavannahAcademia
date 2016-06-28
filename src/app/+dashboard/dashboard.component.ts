import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService} from '../+login/shared';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  pipes: [Time],
  providers: [AuthService],
  directives: [CORE_DIRECTIVES]
})
export class DashboardComponent implements OnInit {
  toggle: boolean = false;
  profile: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profile = this.authService.getProfile();
  }
  toggleSidebar() {
    this.toggle = !this.toggle;
  }
}
