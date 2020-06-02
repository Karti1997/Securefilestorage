import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm): void {
    console.log(form.value.username);
    console.log(form.value.password);
    if (form.invalid) {
      return;
    } /*else if (form.value.username === 'admin' && form.value.password === 'admin') {
    this.router.navigate(['/upload']);
     }*/
     else {
      this.authService.login(form.value.username, form.value.password);
    }
  }
}
