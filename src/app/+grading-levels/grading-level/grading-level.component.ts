import { Component, OnInit } from '@angular/core';
import { GradingLevel, GradingLevelService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-grading-level',
  templateUrl: 'grading-level.component.html',
  styleUrls: ['grading-level.component.css'],
  directives: [Toasty],
})
export class GradingLevelComponent implements OnInit {

  gradingLevel: GradingLevel;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private gradingLevelService: GradingLevelService, params$: RouteParams,
    router: Router, private toastyService: ToastyService) {
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
      this.showToast('success', 'Grading Level', 'Saved succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Grading Level', 'Save Failed');
      });
  }
  showToast(type: string, title: string, content: string) {
    let options = {
      title: title,
      msg: content,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap'
    };
    switch (type) {
      case 'default': this.toastyService.default(options); break;
      case 'info': this.toastyService.info(options); break;
      case 'success': this.toastyService.success(options); break;
      case 'wait': this.toastyService.wait(options); break;
      case 'error': this.toastyService.error(options); break;
      case 'warning': this.toastyService.warning(options); break;
    }
  }

}
