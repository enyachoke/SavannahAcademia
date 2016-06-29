import { Component, OnInit } from '@angular/core';
import { Term, TermService } from '../shared/index';
import { Year, YearService } from '../../+years/shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-term',
  templateUrl: 'term.component.html',
  styleUrls: ['term.component.css'],
  directives: [Toasty],
  providers: [YearService]
})
export class TermComponent implements OnInit {
  years: Year[];
  term: Term;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private termService: TermService, params$: RouteParams,
    private yearService: YearService, private toastyService: ToastyService,
    router: Router) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  getYears() {
    this.yearService.getAll().subscribe(years => this.years = years);
  }
  ngOnInit() {
    this.getYears();
    if (this.id) {
      this.termService.getOne(this.id)
        .subscribe(term => this.term = term);
    } else {
      this.isNew = true;
      this.term = new Term();
    }
  }
  save() {
    this.termService
      .save(this.term)
      .subscribe(term => {
      this.term = term;
      this.isNew = false;
      this.showToast('success', 'Term', 'Saved succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Term', 'Save Failed');
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
