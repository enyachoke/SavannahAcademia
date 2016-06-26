import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/index';
import { Login } from './shared/index';
import {Router} from '@ngrx/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [
    AuthService,
    Router
  ]
})
export class LoginComponent implements OnInit {
  loginModel: Login = { username: '', password: '' };
  error: any;
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.loginModel).subscribe(token => {
      window.location.replace('/');
    }, error => this.error = error);
  }

}
