import { Component, OnInit } from '@angular/core';
import { ExamPeriod, ExamPeriodService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-exam-period-list',
  templateUrl: 'exam-period-list.component.html',
  styleUrls: ['exam-period-list.component.css']
})
export class ExamPeriodListComponent implements OnInit {

  error: any;
  examPeriods: ExamPeriod[];
  getExamPeriods() {
    this.examPeriodService.getAll().subscribe(examPeriods => this.examPeriods = examPeriods);
  }
  constructor(private examPeriodService: ExamPeriodService) { }

  ngOnInit() {
    this.getExamPeriods();
  }
  delete(examPeriod: ExamPeriod, event: any) {
    event.stopPropagation();
    this.examPeriodService
      .delete(examPeriod)
      .subscribe(res => {
      console.log(res);
      this.examPeriods = this.examPeriods.filter(h => h !== examPeriod);
    }, error => this.error = error);
  }

}
