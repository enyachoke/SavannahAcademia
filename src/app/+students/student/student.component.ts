import { Component, OnInit} from '@angular/core';
import { Student, StudentService } from '../shared/index';
import { StudentGroup, StudentGroupService } from '../../+student-groups/shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {ToastyService, Toasty} from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css'],
  providers: [StudentGroupService],
  directives: [Toasty]
})
export class StudentComponent implements OnInit {
  student: Student;
  id: any;
  isNew: Boolean;
  error: any;
  studentGroups: StudentGroup[];
  getStudentGroups() {
    this.studentGroupService.getAll().subscribe(studentGroups => this.studentGroups = studentGroups);
  }
  constructor(private studentService: StudentService, params$: RouteParams,
    router: Router, private studentGroupService: StudentGroupService,
    private toastyService: ToastyService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    this.getStudentGroups();
    if (this.id) {
      this.studentService.getOne(this.id)
        .subscribe(student => this.student = student);
    } else {
      this.isNew = true;
      this.student = new Student();
    }
  }
  save() {
    this.studentService
      .save(this.student)
      .subscribe(student => {
      this.student = student;
      this.isNew = false;
      this.showToast('success', 'Student', 'Saved succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Student', 'Save Failed');
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
