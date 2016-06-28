import { Component, OnInit} from '@angular/core';
import { Year, YearService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
@Component({
  moduleId: module.id,
  selector: 'app-year',
  templateUrl: 'year.component.html',
  styleUrls: ['year.component.css'],
  directives: []
})
export class YearComponent implements OnInit {
  year: Year;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private yearService: YearService, params$: RouteParams, router: Router) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.yearService.getOne(this.id)
        .subscribe(year => this.year = year);
    } else {
      this.isNew = true;
      this.year = new Year();
    }
  }
  save() {
    this.yearService
      .save(this.year)
      .subscribe(year => {
      this.year = year;
      this.isNew = false;
    }, error => this.error = error);
  }
}
