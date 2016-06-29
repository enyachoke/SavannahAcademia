import { Component, OnInit } from '@angular/core';
import { Teacher, TeacherService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';

@Component({
  moduleId: module.id,
  selector: 'app-teacher',
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css'],
  directives: [Toasty],
})
export class TeacherComponent implements OnInit {

  teacher: Teacher;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private teacherService: TeacherService, params$: RouteParams,
    router: Router, private toastyService: ToastyService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.teacherService.getOne(this.id)
        .subscribe(teacher => this.teacher = teacher);
    } else {
      this.isNew = true;
      this.teacher = new Teacher();
    }
  }
  save() {
    this.teacherService
      .save(this.teacher)
      .subscribe(teacher => {
      this.teacher = teacher;
      this.isNew = false;
      this.showToast('success', 'Teacher', 'Saved succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Teacher', 'Save Failed');
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
