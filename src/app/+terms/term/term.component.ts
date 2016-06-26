import { Component, OnInit } from '@angular/core';
import { Term, TermService } from '../shared/index';
import { Year, YearService } from '../../+years/shared/index';
import { RouteParams, Router } from '@ngrx/router';
import { DateTimePickerDirective } from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-term',
  templateUrl: 'term.component.html',
  styleUrls: ['term.component.css'],
  directives: [DateTimePickerDirective],
  providers: [YearService]
})
export class TermComponent implements OnInit {
  years: Year[];
  term: Term;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private termService: TermService, params$: RouteParams,
    private yearService: YearService,
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
    }, error => this.error = error);
  }
}
