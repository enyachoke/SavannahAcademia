import { Component, OnInit } from '@angular/core';
import { Teacher, TeacherService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-teacher-list',
  templateUrl: 'teacher-list.component.html',
  styleUrls: ['teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  error: any;
  teachers: Teacher[];
  getTeachers() {
    this.teacherService.getAll().subscribe(teachers => this.teachers = teachers);
  }
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.getTeachers();
  }
  delete(teacher: Teacher, event: any) {
    event.stopPropagation();
    this.teacherService
      .delete(teacher)
      .subscribe(res => {
      console.log(res);
      this.teachers = this.teachers.filter(h => h !== teacher);
    }, error => this.error = error);
  }

}
