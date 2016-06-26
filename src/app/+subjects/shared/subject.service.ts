import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject} from '../shared';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class SubjectService {
  private resourceUrl = `${Config.getBackend() }subjects`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(options: any): Observable<Subject[]> {
    return this.http.get(this.resourceUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.resourceUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new Subject
  private post(subject: Subject): Observable<Subject> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { subject: subject };
    return this.http
      .post(this.resourceUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(subject: Subject): Observable<Subject> {
    if (subject.id) {
      return this.put(subject);
    }
    return this.post(subject);
  }
  // Update existing Subject
  private put(subject: Subject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.resourceUrl}/${subject.id}`;
    let payload = { subject: subject };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(subject: Subject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.resourceUrl}/${subject.id}`;

    return this.http
      .delete(url, headers)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    console.log(error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
  private extractData(res: Response) {
    let body = res.json();
    let data = body[Object.getOwnPropertyNames(body)[0]];
    return data || {};
  }

}
