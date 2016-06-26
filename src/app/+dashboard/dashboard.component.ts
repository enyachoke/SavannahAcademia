import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { DateTimePickerDirective} from '../shared/components';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  pipes: [Time],
  directives: [CORE_DIRECTIVES, DateTimePickerDirective]
})
export class DashboardComponent implements OnInit {
  toggle: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleSidebar() {
    this.toggle = !this.toggle;
  }
}
