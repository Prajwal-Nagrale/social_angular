import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userEmail:string;
  userPassword:string;

  test(){
    //console.log(this.userEmail+"   "+this.userPassword);
    this.jwt.login(this.userEmail,this.userPassword).subscribe((data)=>
    {
      console.log(data);
      localStorage.setItem('access-token',data.token);
      this.router.navigate(['/home']);
    })
  }

  constructor(private jwt:JwtService,private router:Router ) { }

  ngOnInit(): void {
  }

}
