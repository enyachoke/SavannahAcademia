import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StudentGroup } from './student-group.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class StudentGroupService {

  private studentGroupsUrl = `${Config.getBackend() }student_groups`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<StudentGroup[]> {
    return this.http.get(this.studentGroupsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.studentGroupsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new StudentGroup
  private post(studentGroup: StudentGroup): Observable<StudentGroup> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { student_group: studentGroup };
    return this.http
      .post(this.studentGroupsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(studentGroup: StudentGroup): Observable<StudentGroup> {
    if (studentGroup.id) {
      return this.put(studentGroup);
    }
    return this.post(studentGroup);
  }
  // Update existing StudentGroup
  private put(studentGroup: StudentGroup) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentGroupsUrl}/${studentGroup.id}`;
    let payload = { student_group: studentGroup };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(studentGroup: StudentGroup) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentGroupsUrl}/${studentGroup.id}`;

    return this.http
      .delete(url, headers)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    let body = res.json();
    let data = body[Object.getOwnPropertyNames(body)[0]];
    return data || {};
  }

}
