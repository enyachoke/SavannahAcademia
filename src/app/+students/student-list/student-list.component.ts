import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-student-list',
  templateUrl: 'student-list.component.html',
  styleUrls: ['student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  error: any;
  students: Student[];
  getStudents() {
    this.studentService.getAll().subscribe(students => this.students = students);
  }
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  delete(student: Student, event: any) {
    event.stopPropagation();
    this.studentService
      .delete(student)
      .subscribe(res => {
      console.log(res);
      this.students = this.students.filter(h => h !== student);
    }, error => this.error = error);
  }
}
