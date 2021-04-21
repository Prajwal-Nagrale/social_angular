import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwt:JwtService,private router:Router){}
  canActivate():boolean {
     if(this.jwt.loggedIn){
       return true;
     }else{
       this.router.navigate(['/register']);
       return false;
     }
  }
  
}
