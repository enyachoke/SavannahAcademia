import { Component, OnInit} from '@angular/core';
import { ClassRoom, ClassRoomSubject, ClassRoomService, ClassRoomSubjectService } from '../shared/index';
import { RouteParams, Router } from '@ngrx/router';
import {URLSearchParams} from '@angular/http';
import { Subject, SubjectService } from '../../+subjects/shared/index';
import { Teacher, TeacherService } from '../../+teachers/shared/index';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {ToastyService, Toasty} from '../../shared/components';
@Component({
  moduleId: module.id,
  selector: 'app-class-room',
  templateUrl: 'class-room.component.html',
  styleUrls: ['class-room.component.css'],
  directives: [MODAL_DIRECTVES, Toasty],
  viewProviders: [BS_VIEW_PROVIDERS],
  providers: [SubjectService, ClassRoomSubjectService, TeacherService]
})
export class ClassRoomComponent implements OnInit {
  classRoom: ClassRoom;
  id: any;
  isNew: Boolean;
  error: any;
  subjects: Subject[];
  teachers: Teacher[];
  selectedClassRoomSubject: ClassRoomSubject;
  selectedTeacherId: number;
  modalInstance: any;
  getSubjects() {
    let params = new URLSearchParams();
    let excludeIds = this.classRoom.subjects.map(function(elem) {
      return elem.id;
    }).join(',');
    params.set('exclude', excludeIds);
    this.subjectService.getAll({ search: params }).subscribe(subjects => this.subjects = subjects);
  }
  constructor(private classRoomService: ClassRoomService, params$: RouteParams,
    private router: Router, private subjectService: SubjectService,
    private teacherService: TeacherService,
    private toastyService: ToastyService,
    private classRoomSubjectService: ClassRoomSubjectService) {
    params$.pluck<number>('id').subscribe(id => this.id = id);
  }
  ngOnInit() {
    if (this.id) {
      this.getClassRoom();
    } else {
      this.isNew = true;
      this.classRoom = new ClassRoom();
    }
  }
  getClassRoom() {
    this.classRoomService.getOne(this.id)
      .subscribe(classRoom => {
      this.classRoom = classRoom;
      this.getSubjects();
    });
  }
  getTeachers() {
    this.teacherService.getAll().subscribe(teachers => {
      this.teachers = teachers;
      this.modalInstance.show();
    });
  }
  save() {
    this.classRoomService
      .save(this.classRoom)
      .subscribe(classRoom => {
      this.classRoom = classRoom;
      this.isNew = false;
      //this.router.go(`/dashboard/class-rooms/${classRoom.id}`);
      this.showToast('success', 'Save Class Room', 'Saved successfully');
    }, error => {
        this.showToast('error', 'Save Class Room', 'Failed');
        this.error = error;
      });
  }
  addSubject(subject, event) {
    event.stopPropagation();
    let classRoomSubject = new ClassRoomSubject();
    classRoomSubject.subject_id = subject.id;
    classRoomSubject.class_room_id = this.classRoom.id;
    this.classRoomSubjectService.save(classRoomSubject)
      .subscribe(res => {
      this.showToast('success', 'Add Subject', 'Subject added successfully');
      this.getClassRoom();
    }, error => {
        this.error = error;
        this.showToast('error', 'Add Subject', 'Failed');
      });
  }
  removeSubject(classRoomSubject, event) {
    event.stopPropagation();
    this.classRoomSubjectService.delete(classRoomSubject)
      .subscribe(res => {
      this.getClassRoom();
      this.showToast('success', 'Remove Subject', 'Subject removed successfully');
    }, error => {
        this.showToast('error', 'Remove Subject', 'Failed');
        this.error = error;
      });
  }
  openAssignSubjectModal(classRoomSubject, event, modal) {
    this.modalInstance = modal;
    event.stopPropagation();
    this.selectedClassRoomSubject = classRoomSubject;
    if (this.teachers && this.teachers.length > 0) {
      this.modalInstance.show();
    } else {
      this.getTeachers();
    }
  }
  assignSubjectTeacher() {
    this.selectedClassRoomSubject.teacher_id = this.selectedTeacherId;
    console.log(this.selectedClassRoomSubject);
    this.classRoomSubjectService.save(this.selectedClassRoomSubject)
      .subscribe(selectedClassRoomSubject => {
      this.selectedClassRoomSubject = null;
      this.selectedTeacherId = null;
      this.modalInstance.hide();
      this.getClassRoom();
      this.showToast('success', 'Assign Teacher', 'Teacher assigned succesfully');
    }, error => {
        this.error = error;
        this.showToast('error', 'Assign Teacher', 'Failed');
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
