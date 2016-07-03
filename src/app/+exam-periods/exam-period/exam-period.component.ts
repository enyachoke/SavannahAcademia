import { Component, OnInit } from '@angular/core';
import { ExamPeriod, ExamPeriodService } from '../shared/index';
import { Term, TermService } from '../../+terms/shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
import {DateRange, DATE_PICKER_PROVIDERS} from '../../shared/fuel-ui';
import * as moment from 'moment';
@Component({
  moduleId: module.id,
  selector: 'app-exam-period',
  templateUrl: 'exam-period.component.html',
  styleUrls: ['exam-period.component.css'],
  providers: [TermService],
  directives: [Toasty, DATE_PICKER_PROVIDERS],
})
export class ExamPeriodComponent implements OnInit {
  dateRangePickerValue: DateRange;
  examPeriod: ExamPeriod;
  id: any;
  isNew: Boolean;
  error: any;
  terms: Term[];
  constructor(private examPeriodService: ExamPeriodService, params$: RouteParams,
    router: Router, private termService: TermService, private toastyService: ToastyService) {
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
      this.examPeriod.start_date = moment().toString();
      this.examPeriod.end_date = moment().toString();
    }
  }
  save() {
    this.examPeriod.start_date = this.dateRangePickerValue.start.toString();
    this.examPeriod.end_date = this.dateRangePickerValue.end.toString();
    this.examPeriodService
      .save(this.examPeriod)
      .subscribe(examPeriod => {
      this.showToast('success', 'Exam Period', 'Saved succesfully');
      this.examPeriod = examPeriod;
      this.isNew = false;
    }, error => {
        this.error = error;
        this.showToast('error', 'Exam Period', 'Save Failed');
      });
  }
  datePickerValueChange(eventValue: any) {
    this.dateRangePickerValue = eventValue;
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
