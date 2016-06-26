import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExamPeriod } from './exam-period.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ExamPeriodService {

  private examPeriodsUrl = `${Config.getBackend() }exam_periods`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<ExamPeriod[]> {
    return this.http.get(this.examPeriodsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.examPeriodsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new ExamPeriod
  private post(examPeriod: ExamPeriod): Observable<ExamPeriod> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { exam_period: examPeriod };
    return this.http
      .post(this.examPeriodsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(examPeriod: ExamPeriod): Observable<ExamPeriod> {
    if (examPeriod.id) {
      return this.put(examPeriod);
    }
    return this.post(examPeriod);
  }
  // Update existing ExamPeriod
  private put(examPeriod: ExamPeriod) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.examPeriodsUrl}/${examPeriod.id}`;
    let payload = { exam_period: examPeriod };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(examPeriod: ExamPeriod) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.examPeriodsUrl}/${examPeriod.id}`;

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
