import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../authservice';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit(): void {
  }
  onsignup(form: NgForm): void {
    console.log(form.value.firstname);
    console.log(form.value.username);
    console.log(form.value.password);
    console.log(form.value.confirmpassword);
    console.log(form.value.email);
    console.log(form.value.phoneno);
   if (form.value.password ===  form.value.confirmpassword) {
    this.authService.createUser(form.value.firstname,form.value.username,form.value.password,form.value.confirmpassword,form.value.email,form.value.phoneno);  
  }
  else{
    alert("Your given password and confirm password differs");
  }
}
}
