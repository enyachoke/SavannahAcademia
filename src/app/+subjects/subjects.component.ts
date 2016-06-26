import { Component, OnInit } from '@angular/core';
import { SubjectService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-subjects',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css'],
  providers: [
    SubjectService,
  ]
})
export class SubjectsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
