import { Component, OnInit } from '@angular/core';
import { GradingLevelService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-grading-levels',
  templateUrl: 'grading-levels.component.html',
  styleUrls: ['grading-levels.component.css'],
  providers: [
    GradingLevelService,
  ]
})
export class GradingLevelsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
