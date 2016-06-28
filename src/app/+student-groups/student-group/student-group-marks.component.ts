import { Component, OnInit} from '@angular/core';
import { StudentGroup, StudentGroupService, StudentGroupMarkService } from '../shared/index';
import { ClassRoomSubject } from '../../+class-rooms/shared/index';
import { ExamPeriod, ExamPeriodService } from '../../+exam-periods/shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {URLSearchParams} from '@angular/http';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-student-group',
  templateUrl: 'student-group-marks.component.html',
  styleUrls: ['student-group.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [ExamPeriodService, StudentGroupMarkService]
})
export class StudentGroupMarksComponent implements OnInit {
  studentGroup: StudentGroup;
  examPeriods: ExamPeriod[];
  classRoomSubjects: ClassRoomSubject[];
  resultForm: FormGroup;
  examPeriod: ExamPeriod;
  classRoomSubject: ClassRoomSubject;
  existingMarks: any = [];
  id: any;
  showMarks: Boolean;
  error: any;
  resultArray = new FormArray([]);
  constructor(private studentGroupService: StudentGroupService, params$: RouteParams,
    router: Router, private fb: FormBuilder,
    private examPeriodService: ExamPeriodService, private studentGroupMarkService: StudentGroupMarkService
    ) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
    this.resultForm = fb.group({
      results: this.resultArray
    });
  }
  ngOnInit() {
    this.classRoomSubject = new ClassRoomSubject();
    this.examPeriod = new ExamPeriod();
    this.getData();
  }
  getExisiting() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('student_group_id', this.studentGroup.id + '');
    params.set('exam_period_id', this.examPeriod.id + '');
    params.set('class_room_subject_id', this.classRoomSubject.id + '');
    this.studentGroupMarkService.getByExisiting(params).subscribe(
      data => {
        this.existingMarks = data;
        this.generateResultSet();
      },
      err => console.error(err)
      );
  }
  getData() {
    if (this.id) {

      Observable.forkJoin(
        this.studentGroupService.getOne(this.id),
        this.examPeriodService.getAll()
        ).subscribe(
        data => {
          this.studentGroup = data[0];
          this.examPeriods = data[1];
          this.classRoomSubjects = this.studentGroup.class_subjects;
          this.existingMarks = data[2];
        },
        err => console.error(err)
        );
    }
  }
  addResult(mark) {
    this.resultArray.push(this.fb.group({
      id: this.fb.control(Number(mark.id)),
      student_id: this.fb.control(Number(mark.student_id), Validators.required),
      class_room_subject_id: this.fb.control(Number(mark.class_room_subject_id), Validators.required),
      student_group_id: this.fb.control(Number(mark.student_group_id), Validators.required),
      exam_period_id: this.fb.control(Number(mark.exam_period_id), Validators.required),
      name: this.fb.control(mark.name),
      marks: this.fb.control(mark.marks, Validators.required),
      points: this.fb.control(mark.points, Validators.required),
      comments: this.fb.control(mark.comments, Validators.required)
    }));
  }
  generateResultSet() {
    let students = this.studentGroup.students;
    let marks = [];
    for (let student of students) {
      let mark = {
        name: `${student.first_name} ${student.middle_name} ${ student.last_name }`,
        student_id: student.id,
        class_room_subject_id: this.classRoomSubject.id,
        student_group_id: this.studentGroup.id,
        exam_period_id: this.examPeriod.id,
        marks: null,
        points: null,
        comments: null
      };
      marks.push(mark);
    }
    let combined = this.combineResults(marks, this.existingMarks);
    this.generateView(combined);
  }
  combineResults(newResults, existingMarks) {
    let hash = new Map();
    newResults.concat(existingMarks).forEach(function(obj) {
      hash.set(obj.student_id, Object.assign(hash.get(obj.student_id) || {}, obj));
    });
    return Array.from(hash.values());
  }
  generateView(marks) {
    let vm = this;
    for (let mark of marks) {
      vm.addResult(mark);
    }
  }
  saveResults() {
    let clone = JSON.parse(JSON.stringify(this.resultForm.value.results));
    let marks = clone.map(function(item) {
      delete item.name;
      return item;
    });
    this.studentGroupMarkService.saveAll(marks).subscribe(
      data => {
        this.resultArray = new FormArray([]);
        this.existingMarks = data;
        this.generateResultSet();
      },
      err => console.error(err)
      );
  }
  onChange() {
    let vm = this;
    let exam = this.examPeriods.find(function(d) {
      return d.id === Number(vm.examPeriod.id);
    });
    let subject = this.classRoomSubjects.find(function(d) {
      return d.id === Number(vm.classRoomSubject.id);
    });
    if (exam && subject) {
      this.classRoomSubject = subject;
      this.examPeriod = exam;
      this.removeAll();
      this.getExisiting();
    }
  }
  removeAll() {
    this.resultForm.controls['results']['controls'] = [];
    (<FormGroup>this.resultForm.controls['results']).updateValueAndValidity();
  }
}
