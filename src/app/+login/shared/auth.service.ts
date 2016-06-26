import { Injectable } from '@angular/core';
import { Login } from '../shared';
import { Observable } from 'rxjs/Observable';
import {Config} from '../../shared/config';
import { Headers, Http, Response} from '@angular/http';
@Injectable()
export class AuthService {
  private loginUrl = `${Config.getBackend() }authenticate`;  // URL to web api
  constructor(private http: Http) { }
  login(login: Login): Observable<Login> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.loginUrl, JSON.stringify(login), { headers: headers })
      .map(this.extractToken)
      .catch(this.handleError);
  }
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('profile');
    window.location.replace('/login');
  }
  getProfile() {
    return localStorage.getItem('profile');
  }
  private extractToken(res: Response) {
    let body = res.json();
    localStorage.setItem('auth_token', body.auth_token);
    let profileString = JSON.stringify(body.profile);
    localStorage.setItem('profile', profileString);
    return body || {};
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
