import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'
import { FormGroup,FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userName:string;
  email:string;
  password:string;
  successMsg:string;
  errorMsg:string;

  form = new FormGroup({

    name: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9]+')])
  })

  create(){
    //console.log(this.userName+" User account Created");
    this.jwt.create(this.userName,this.email,this.password).subscribe((data)=>
    {
      this.successMsg=data.status;
      //console.log(data.message);
      this.form.reset();
    },(error)=>{
      this.errorMsg=error.error.message;
      //console.log(error.error.message)
    });
    
  }


  constructor(private jwt:JwtService,private router:Router) { }

  ngOnInit(): void {
  
  }

}
