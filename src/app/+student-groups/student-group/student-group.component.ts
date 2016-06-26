import { Component, OnInit } from '@angular/core';
import { StudentGroup, StudentGroupService } from '../shared/index';
import { Year, YearService } from '../../+years/shared/index';
import { Teacher, TeacherService } from '../../+teachers/shared/index';
import { ClassRoom, ClassRoomService } from '../../+class-rooms/shared/index';
import { ClassTimingsComponent } from '../../class-timings';
import { RouteParams, Router } from '@ngrx/router';
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-student-group',
  templateUrl: 'student-group.component.html',
  styleUrls: ['student-group.component.css'],
  directives: [ClassTimingsComponent, TAB_DIRECTIVES],
  providers: [YearService, TeacherService, ClassRoomService]
})
export class StudentGroupComponent implements OnInit {
  public days: Array<any> = [
    { name: 'Monday', number: 1 },
    { name: 'Tuesday', number: 2 },
    { name: 'Wednesday', number: 3 },
    { name: 'Thurday', number: 4 },
    { name: 'Friday', number: 5 },
    { name: 'Saturday', number: 6 }
  ];
  studentGroup: StudentGroup;
  years: Year[];
  teachers: Teacher[];
  classRooms: ClassRoom[];
  id: any;
  isNew: Boolean;
  error: any;
  weekDay: number;
  constructor(private studentGroupService: StudentGroupService, params$: RouteParams,
    router: Router, private yearService: YearService, private teacherService: TeacherService,
    private classRoomService: ClassRoomService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  getYears() {
    this.yearService.getAll().subscribe(years => this.years = years);
  }
  getTeachers() {
    this.teacherService.getAll().subscribe(teachers => this.teachers = teachers);
  }
  getClassRooms() {
    this.classRoomService.getAll().subscribe(classRooms => this.classRooms = classRooms);
  }
  ngOnInit() {
    this.weekDay = 1;
    this.getYears();
    this.getClassRooms();
    this.getTeachers();
    if (this.id) {
      this.studentGroupService.getOne(this.id)
        .subscribe(studentGroup => this.studentGroup = studentGroup);
    } else {
      this.isNew = true;
      this.studentGroup = new StudentGroup();
    }
  }
  save() {
    this.studentGroupService
      .save(this.studentGroup)
      .subscribe(studentGroup => {
      this.studentGroup = studentGroup;
      this.isNew = false;
    }, error => this.error = error);
  }
  tabSelected(day) {
    this.weekDay = day;
  }

}
