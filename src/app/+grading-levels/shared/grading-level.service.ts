import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GradingLevel } from './grading-level.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class GradingLevelService {

  private gradingLevelsUrl = `${Config.getBackend() }grading_levels`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<GradingLevel[]> {
    return this.http.get(this.gradingLevelsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.gradingLevelsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new GradingLevel
  private post(gradingLevel: GradingLevel): Observable<GradingLevel> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { grading_level: gradingLevel };
    return this.http
      .post(this.gradingLevelsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(gradingLevel: GradingLevel): Observable<GradingLevel> {
    if (gradingLevel.id) {
      return this.put(gradingLevel);
    }
    return this.post(gradingLevel);
  }
  // Update existing GradingLevel
  private put(gradingLevel: GradingLevel) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.gradingLevelsUrl}/${gradingLevel.id}`;
    let payload = { grading_level: gradingLevel };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(gradingLevel: GradingLevel) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.gradingLevelsUrl}/${gradingLevel.id}`;

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
