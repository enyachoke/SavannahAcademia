import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Guard, Router, TraversalCandidate} from '@ngrx/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements Guard {
  constructor(private _http: Http, private _router: Router) { }

  protectRoute(candidate: TraversalCandidate) {
    if (tokenNotExpired('auth_token')) {
      return Observable.of(true);
    } else {
      this._router.go('/login');
      return Observable.of(false);
    }
  }
}
