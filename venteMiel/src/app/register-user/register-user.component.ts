import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  constructor(private userService: UserService, private router:Router) { }
  ngOnInit(): void {

  }
  hide = true;
  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {
        this.router.navigate(['/login'])
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
