import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StudentGroupMark } from './student-group-mark.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class StudentGroupMarkService {

  private studentGroupMarksUrl = `${Config.getBackend() }student_group_marks`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<StudentGroupMark[]> {
    return this.http.get(this.studentGroupMarksUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getReportCards(): Observable<any[]> {
    return this.http.get(`${this.studentGroupMarksUrl}/student_marks`)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.studentGroupMarksUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getByExisiting(params): Observable<StudentGroupMark[]> {
    return this.http.get(`${this.studentGroupMarksUrl}/existing`, {
      search: params
    })
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new StudentGroupMark
  private post(studentGroupMark: StudentGroupMark): Observable<StudentGroupMark> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { student_group: studentGroupMark };
    return this.http
      .post(this.studentGroupMarksUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(studentGroupMark: StudentGroupMark): Observable<StudentGroupMark> {
    if (studentGroupMark.id) {
      return this.put(studentGroupMark);
    }
    return this.post(studentGroupMark);
  }
  saveAll(payload) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.studentGroupMarksUrl}/save_all`;
    return this.http
      .post(url, JSON.stringify({ marks: payload }), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Update existing StudentGroupMark
  private put(studentGroupMark: StudentGroupMark) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentGroupMarksUrl}/${studentGroupMark.id}`;
    let payload = { student_group: studentGroupMark };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(studentGroupMark: StudentGroupMark) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentGroupMarksUrl}/${studentGroupMark.id}`;

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
