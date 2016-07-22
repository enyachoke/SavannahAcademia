import { Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-subject',
  templateUrl: 'subject.component.html',
  styleUrls: ['subject.component.css'],
  directives: [Toasty],
})
export class SubjectComponent implements OnInit {

  subject: Subject;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private subjectService: SubjectService, params$: RouteParams,
    private router: Router, private toastyService: ToastyService) {
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
      this.showToast('success', 'Subject', 'Saved succesfully');
    }, error => {
        this.showToast('error', 'Subject', 'Save Failed');
        this.error = JSON.parse(error._body);
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
