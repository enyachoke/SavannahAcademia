import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClassRoomSubject } from './class-room-subject.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ClassRoomSubjectService {

  private classRoomSubjectsUrl = `${Config.getBackend() }class_room_subjects`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<ClassRoomSubject[]> {
    return this.http.get(this.classRoomSubjectsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.classRoomSubjectsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new ClassRoomSubject
  private post(classRoomSubject: ClassRoomSubject): Observable<ClassRoomSubject> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { class_room_subject: classRoomSubject };
    return this.http
      .post(this.classRoomSubjectsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(classRoomSubject: ClassRoomSubject): Observable<ClassRoomSubject> {
    if (classRoomSubject.id) {
      return this.put(classRoomSubject);
    }
    return this.post(classRoomSubject);
  }
  // Update existing ClassRoomSubject
  private put(classRoomSubject: ClassRoomSubject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classRoomSubjectsUrl}/${classRoomSubject.id}`;
    let payload = { class_room_subject: classRoomSubject };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(classRoomSubject: ClassRoomSubject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classRoomSubjectsUrl}/${classRoomSubject.id}`;

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
