import { Component, OnInit } from '@angular/core';
import { GradingLevel, GradingLevelService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-grading-level-list',
  templateUrl: 'grading-level-list.component.html',
  styleUrls: ['grading-level-list.component.css']
})
export class GradingLevelListComponent implements OnInit {

  error: any;
  gradingLevels: GradingLevel[];
  getGradingLevels() {
    this.gradingLevelService.getAll().subscribe(gradingLevels => this.gradingLevels = gradingLevels);
  }
  constructor(private gradingLevelService: GradingLevelService) { }

  ngOnInit() {
    this.getGradingLevels();
  }
  delete(gradingLevel: GradingLevel, event: any) {
    event.stopPropagation();
    this.gradingLevelService
      .delete(gradingLevel)
      .subscribe(res => {
      console.log(res);
      this.gradingLevels = this.gradingLevels.filter(h => h !== gradingLevel);
    }, error => this.error = error);
  }


}
