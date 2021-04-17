import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email:string;
  name:string; 
  
  check(){
    this.email=this.jwt.getEmail();
    if(this.email){
      this.jwt.getById(this.email).subscribe((data)=>{
        this.name=data.message[0].userName;
      })
    }
    
  }
  
  constructor(private jwt:JwtService,private router:Router ) {
    
   }

  ngOnInit(): void {
    this.check();
   
  }

}
