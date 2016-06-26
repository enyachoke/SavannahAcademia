import { Component, OnInit } from '@angular/core';
import { Year, YearService } from '../shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-year-list',
  templateUrl: 'year-list.component.html',
  styleUrls: ['year-list.component.css'],
})
export class YearListComponent implements OnInit {
  error: any;
  years: Year[];
  constructor(private yearService: YearService) { }
  getYears() {
    this.yearService.getAll().subscribe(years => this.years = years);
  }

  ngOnInit() {
    this.getYears();
  }
  delete(year: Year, event: any) {
    event.stopPropagation();
    this.yearService
      .delete(year)
      .subscribe(res => {
      this.years = this.years.filter(h => h !== year);
    }, error => this.error = error);
  }
}
