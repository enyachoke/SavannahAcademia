import { Component, OnInit } from '@angular/core';
import { Teacher, TeacherService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';

@Component({
  moduleId: module.id,
  selector: 'app-teacher',
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacher: Teacher;
  id: any;
  isNew: Boolean;
  error: any;
  constructor(private teacherService: TeacherService, params$: RouteParams, router: Router) {
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
    }, error => this.error = error);
  }

}
