import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Student} from '../shared';
import {AuthHttp} from 'angular2-jwt';
import {Config} from '../../shared/config';
@Injectable()
export class StudentService {

  private studentsUrl = `${Config.getBackend() }students`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<Student[]> {
    return this.http.get(this.studentsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.studentsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new Student
  private post(student: Student): Observable<Student> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { student: student };
    return this.http
      .post(this.studentsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(student: Student): Observable<Student> {
    if (student.id) {
      return this.put(student);
    }
    return this.post(student);
  }
  // Update existing Student
  private put(student: Student) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentsUrl}/${student.id}`;
    let payload = { student: student };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(student: Student) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.studentsUrl}/${student.id}`;

    return this.http
      .delete(url, headers)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    let body = res.json();
    let data = body[Object.getOwnPropertyNames(body)[0]];
    return data || {};
  }
}
