import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9]+')])
})

  userEmail:string;
  userPassword:string;
  msg:boolean = false;
  test(){
    this.jwt.login(this.userEmail,this.userPassword).subscribe((data)=>
    {
      this.msg = true;
      console.log(data);
      localStorage.setItem('access-token',data.token);
      this.router.navigate(['/home']);
     
    })
  }
  signOut() {
    this.jwt.logout();
    this.msg = false;
  }

  constructor(private jwt:JwtService,private router:Router ) { }

  ngOnInit(): void {
  }

}
