import { Component, OnInit } from '@angular/core';
import { ExamPeriodService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-exam-periods',
  templateUrl: 'exam-periods.component.html',
  styleUrls: ['exam-periods.component.css'],
  providers: [
    ExamPeriodService,
  ]
})
export class ExamPeriodsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
