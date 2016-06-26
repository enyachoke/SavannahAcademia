import { Component, OnInit } from '@angular/core';
import { StudentGroup, StudentGroupService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-student-group-list',
  templateUrl: 'student-group-list.component.html',
  styleUrls: ['student-group-list.component.css']
})
export class StudentGroupListComponent implements OnInit {

  error: any;
  studentGroups: StudentGroup[];
  getStudentGroups() {
    this.studentGroupService.getAll().subscribe(studentGroups => this.studentGroups = studentGroups);
  }
  constructor(private studentGroupService: StudentGroupService) { }

  ngOnInit() {
    this.getStudentGroups();
  }
  delete(studentGroup: StudentGroup, event: any) {
    event.stopPropagation();
    this.studentGroupService
      .delete(studentGroup)
      .subscribe(res => {
      console.log(res);
      this.studentGroups = this.studentGroups.filter(h => h !== studentGroup);
    }, error => this.error = error);
  }


}
