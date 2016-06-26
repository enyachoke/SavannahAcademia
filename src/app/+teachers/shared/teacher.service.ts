import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Teacher} from '../shared';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class TeacherService {
  private teachersUrl = `${Config.getBackend() }teachers`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<Teacher[]> {
    return this.http.get(this.teachersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.teachersUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new Teacher
  private post(teacher: Teacher): Observable<Teacher> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { teacher: teacher };
    return this.http
      .post(this.teachersUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(teacher: Teacher): Observable<Teacher> {
    if (teacher.id) {
      return this.put(teacher);
    }
    return this.post(teacher);
  }
  // Update existing Teacher
  private put(teacher: Teacher) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.teachersUrl}/${teacher.id}`;
    let payload = { teacher: teacher };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(teacher: Teacher) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.teachersUrl}/${teacher.id}`;

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
