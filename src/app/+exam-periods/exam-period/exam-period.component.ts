import { Component, OnInit } from '@angular/core';
import { ExamPeriod, ExamPeriodService } from '../shared/index';
import { Term, TermService } from '../../+terms/shared/index';
import { RouteParams, Router } from '@ngrx/router';
@Component({
  moduleId: module.id,
  selector: 'app-exam-period',
  templateUrl: 'exam-period.component.html',
  styleUrls: ['exam-period.component.css'],
  providers: [TermService]
})
export class ExamPeriodComponent implements OnInit {

  examPeriod: ExamPeriod;
  id: any;
  isNew: Boolean;
  error: any;
  terms: Term[];
  constructor(private examPeriodService: ExamPeriodService, params$: RouteParams,
    router: Router, private termService: TermService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  getTerms() {
    this.termService.getAll().subscribe(terms => this.terms = terms);
  }
  ngOnInit() {
    this.getTerms();
    if (this.id) {
      this.examPeriodService.getOne(this.id)
        .subscribe(examPeriod => this.examPeriod = examPeriod);
    } else {
      this.isNew = true;
      this.examPeriod = new ExamPeriod();
    }
  }
  save() {
    this.examPeriodService
      .save(this.examPeriod)
      .subscribe(examPeriod => {
      this.examPeriod = examPeriod;
      this.isNew = false;
    }, error => this.error = error);
  }


}
