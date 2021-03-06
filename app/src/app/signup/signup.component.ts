import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'
import { FormGroup,FormControl, Validators } from '@angular/forms';
import {User} from '../User'
import * as forge from 'node-forge'

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

user?:User={userName:'',email:'',password:''}

publicKey=`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIhPFxQlQvxjkBS0WYSbt48kxX
+9vzEEDdYtsmU3dZXaJVGL71HyI1GgQhFZuK5QxAg6V5A87IEHChLWli+UqeVFFG
9zEEe+phWbe3oZoIWWPM3r9atRkJ4mnRIwuL2gDKJqfJlFtyfXbCuaVPhX7XE3c2
kLjuV3/XVzjRPzaslQIDAQAB
-----END PUBLIC KEY-----`;



  userEmail:string;
  userPassword:string;
  successMsg:string;
  errorMsg:string;
  msg:boolean;


  test(){
    var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    var encryptedPassword = rsa.encrypt(this.userPassword);
    //console.log(this.userEmail+"   "+encryptedPassword);
    this.jwt.login(this.userEmail,encryptedPassword).subscribe((data)=>
    {
      this.user.email=this.userEmail;
      this.user.password=encryptedPassword;
      this.msg = true; 
      this.successMsg=data.message;
      //console.log(data.email);
      localStorage.setItem('access-token',data.token);
      localStorage.setItem('userData',JSON.stringify(this.user));
      this.router.navigate(['/home']);
      this.form.reset();
      this.errorMsg="";
    },(error)=>{
        this.errorMsg=error.error.message;
        //console.log(error)
    })

  }

  errorClear(){
      this.errorMsg="";
  }

  signOut() {
    this.jwt.logout();
    this.msg = false;
    this.router.navigate(['/register']);
  }

  constructor(private jwt:JwtService,private router:Router ) { }

  ngOnInit(): void {
     this.msg=this.jwt.loggedIn;
     if(localStorage.getItem('access-token')){
       this.jwt.autoSignIn();
     }
    
  }

}
