import { Component, OnInit } from '@angular/core';
import { GradingLevel, GradingLevelService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';

@Component({
  moduleId: module.id,
  selector: 'app-grading-level',
  templateUrl: 'grading-level.component.html',
  styleUrls: ['grading-level.component.css']
})
export class GradingLevelComponent implements OnInit {

  gradingLevel: GradingLevel;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private gradingLevelService: GradingLevelService, params$: RouteParams,
    router: Router) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.gradingLevelService.getOne(this.id)
        .subscribe(gradingLevel => this.gradingLevel = gradingLevel);
    } else {
      this.isNew = true;
      this.gradingLevel = new GradingLevel();
    }
  }
  save() {
    this.gradingLevelService
      .save(this.gradingLevel)
      .subscribe(gradingLevel => {
      this.gradingLevel = gradingLevel;
      this.isNew = false;
    }, error => this.error = error);
  }


}
