import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Year } from './year.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class YearService {
  private yearsUrl = `${Config.getBackend() }years`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<Year[]> {
    return this.http.get(this.yearsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.yearsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new Year
  private post(year: Year): Observable<Year> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { year: year };
    return this.http
      .post(this.yearsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(year: Year): Observable<Year> {
    if (year.id) {
      return this.put(year);
    }
    return this.post(year);
  }
  // Update existing Year
  private put(year: Year) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.yearsUrl}/${year.id}`;
    let payload = { year: year };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(year: Year) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.yearsUrl}/${year.id}`;

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
