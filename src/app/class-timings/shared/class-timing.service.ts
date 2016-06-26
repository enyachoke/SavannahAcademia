import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClassTiming } from './class-timing.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class ClassTimingService {

  private classTimingsUrl = `${Config.getBackend() }class_timings`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(options: any): Observable<ClassTiming[]> {
    return this.http.get(this.classTimingsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.classTimingsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new ClassTiming
  private post(classTiming: ClassTiming): Observable<ClassTiming> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { class_timing: classTiming };
    return this.http
      .post(this.classTimingsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(classTiming: ClassTiming): Observable<ClassTiming> {
    if (classTiming.id) {
      return this.put(classTiming);
    }
    return this.post(classTiming);
  }
  // Update existing ClassTiming
  private put(classTiming: ClassTiming) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classTimingsUrl}/${classTiming.id}`;
    let payload = { class_timing: classTiming };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(classTiming: ClassTiming) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classTimingsUrl}/${classTiming.id}`;

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
