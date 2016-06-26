import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Term } from '../shared';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class TermService {

  private termsUrl = `${Config.getBackend() }terms`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<Term[]> {
    return this.http.get(this.termsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.termsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new Term
  private post(term: Term): Observable<Term> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { term: term };
    return this.http
      .post(this.termsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(term: Term): Observable<Term> {
    if (term.id) {
      return this.put(term);
    }
    return this.post(term);
  }
  // Update existing Term
  private put(term: Term) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.termsUrl}/${term.id}`;
    let payload = { term: term };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(term: Term) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.termsUrl}/${term.id}`;

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
