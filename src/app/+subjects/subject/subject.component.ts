import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
@Component({
  moduleId: module.id,
  selector: 'app-subject',
  templateUrl: 'subject.component.html',
  styleUrls: ['subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject: Subject;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private subjectService: SubjectService, params$: RouteParams, private router: Router) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.subjectService.getOne(this.id)
        .subscribe(subject => this.subject = subject);
    } else {
      this.isNew = true;
      this.subject = new Subject();
    }
  }
  save() {
    this.subjectService
      .save(this.subject)
      .subscribe(subject => {
      this.subject = subject;
      this.isNew = false;
      this.router.go(`/dashboard/subjects/${subject.id}`);
    }, error => this.error = JSON.parse(error._body));
  }

}
