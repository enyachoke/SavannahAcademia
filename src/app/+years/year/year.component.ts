import { Component, OnInit} from '@angular/core';
import { Year, YearService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
import {DateRange, DATE_PICKER_PROVIDERS} from '../../shared/fuel-ui';
import * as moment from 'moment';
@Component({
  moduleId: module.id,
  selector: 'app-year',
  templateUrl: 'year.component.html',
  styleUrls: ['year.component.css'],
  directives: [Toasty, DATE_PICKER_PROVIDERS],
})
export class YearComponent implements OnInit {
  dateRangePickerValue: DateRange;
  year: Year;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private yearService: YearService, params$: RouteParams,
    router: Router, private toastyService: ToastyService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.yearService.getOne(this.id)
        .subscribe(year => this.year = year);
    } else {
      this.isNew = true;
      this.year = new Year();
      this.year.start_date = moment().toString();
      this.year.end_date = moment().toString();
    }
  }
  save() {
    this.year.start_date = this.dateRangePickerValue.start.toString();
    this.year.end_date = this.dateRangePickerValue.end.toString();
    this.yearService
      .save(this.year)
      .subscribe(year => {
      this.year = year;
      this.isNew = false;
      this.showToast('success', 'Academic Year', 'Saved succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Academic Year', 'Save Failed');
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
  datePickerValueChange(eventValue: any) {
    this.dateRangePickerValue = eventValue;
  }
}
