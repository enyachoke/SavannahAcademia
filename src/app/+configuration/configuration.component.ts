import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService} from '../+login/shared';
import { Time } from '../time.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.css'],
  pipes: [Time],
  providers: [AuthService],
  directives: [CORE_DIRECTIVES]
})
export class ConfigurationComponent implements OnInit {
  base: string = "/dashboard/configuration";
  toggle: boolean = false;
  profile: any;
  constructor() {
  }

  ngOnInit() {

  }
}
