import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-subject-list',
  templateUrl: 'subject-list.component.html',
  styleUrls: ['subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  error: any;
  subjects: Subject[];
  getSubjects() {
    this.subjectService.getAll({}).subscribe(subjects => this.subjects = subjects);
  }
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getSubjects();
  }
  delete(subject: Subject, event: any) {
    event.stopPropagation();
    this.subjectService
      .delete(subject)
      .subscribe(res => {
      console.log(res);
      this.subjects = this.subjects.filter(h => h !== subject);
    }, error => this.error = error);
  }
}
