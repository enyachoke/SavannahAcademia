import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { ClassTiming, ClassTimingService } from './shared/index';
import { Time } from '../time.pipe';
import {URLSearchParams} from '@angular/http';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-class-timings',
  templateUrl: 'class-timings.component.html',
  styleUrls: ['class-timings.component.css'],
  pipes: [Time],
  directives: [MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  providers: [ClassTimingService]
})
export class ClassTimingsComponent implements OnInit, OnChanges {
  @Input() studentGroup;
  @Input() weekDay;
  classTiming: ClassTiming;
  classTimings: ClassTiming[];
  error: any;
  addTiming: boolean;
  modal: any;
  constructor(private classTimingService: ClassTimingService) { }

  getClassTimings() {
    let params = new URLSearchParams();
    params.set('student_group_id', this.studentGroup.id);
    params.set('week_day', this.weekDay);
    this.classTimingService.getAll({ search: params }).subscribe(classTimings => {
      this.classTimings = classTimings;
    });
  }
  ngOnInit() {
    this.addTiming = true;
  }
  addClassTiming(smModal) {
    this.modal = smModal;
    this.modal.show();
    this.classTiming = new ClassTiming();
    this.addTiming = true;
  }
  saveClassTiming() {
    this.classTiming.student_group_id = this.studentGroup.id;
    this.classTiming.week_day = this.weekDay;
    this.classTimingService.save(this.classTiming)
      .subscribe(classTiming => {
      this.classTiming = classTiming;
      this.addTiming = false;
      this.modal.hide();
      this.getClassTimings();
    }, error => this.error = error);
  }
  editTiming(timing: ClassTiming, event, smModal) {
    this.classTiming = Object.assign({}, timing);
    event.preventDefault();
    this.modal = smModal;
    this.modal.show();
    this.addTiming = false;
  }
  ngOnChanges(changes) {
    this.classTiming = new ClassTiming();
    this.addTiming = true;
    if (this.weekDay) {
      this.getClassTimings();
    }
  }
}
