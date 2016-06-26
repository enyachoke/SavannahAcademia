import { Component, OnInit } from '@angular/core';
import { YearService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-years',
  templateUrl: 'years.component.html',
  styleUrls: ['years.component.css'],
  providers: [
    YearService,
  ]
})
export class YearsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
