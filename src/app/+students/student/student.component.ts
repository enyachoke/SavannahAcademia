import { Component, OnInit} from '@angular/core';
import { Student, StudentService } from '../shared/index';
import { StudentGroup, StudentGroupService } from '../../+student-groups/shared/index';
import { RouteParams, Router } from '@ngrx/router';
@Component({
  moduleId: module.id,
  selector: 'app-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css'],
  providers: [StudentGroupService]
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
    router: Router, private studentGroupService: StudentGroupService) {
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
    }, error => this.error = error);
  }
}
