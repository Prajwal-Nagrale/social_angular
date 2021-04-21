import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {User} from './User'


@Injectable({
  providedIn: 'root'
})
export class JwtService {

 user?:User={userName:'',email:'',password:''}
 email:string;

 setEmail(data:string){
     this.email=data;
 }

 getEmail(){
   return this.email;
 }

  constructor(private http: HttpClient) {
   }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  
  
  login(email: string, password: string):Observable<any>{
     this.email=email;
      return this.http.post<any>('http://localhost:8081/user/login',{email,password},this.httpOptions);
  }

  autoSignIn(){
     const userdata=JSON.parse(localStorage.getItem('userData'));

     if(userdata){
       this.email=userdata.email;
     //console.log(userdata.email)
      this.login(userdata.email,userdata.password);
     }else{
       this.email="";
     }
    // const authOptions = { headers: new HttpHeaders({ 'Authorization': 'bearer '+localStorage.getItem('access_token')})};
    // return this.http.get<any>('http://localhost:8081/user/login/auth',authOptions);

  }

  create(userName:string,email: string, password: string):Observable<any>{
    return this.http.post<any>('http://localhost:8081/user',{userName,email,password},this.httpOptions);
  }

  getById(email: string):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/profile/${email}`,this.httpOptions)
  }

  getAllUser():Observable<any>{
    return this.http.get<any>(`http://localhost:8081/profile/`,this.httpOptions)
  }

  updateFriend(email:string,friendEmail:string,friendstatus:string):Observable<any>{
    return this.http.put<any>(`http://localhost:8081/profile/friend/${email}`,{friendEmail,friendstatus},this.httpOptions)
  }

  updateById(userName:string,email:string,city:string,
    state:string,
    gender:string,
    profession:string,img:string):Observable<any>{
    return this.http.put<any>(`http://localhost:8081/profile/${email}`,{userName,city,state,gender,profession,img},this.httpOptions)
  }
  
  logout() {
    this.email="";
  localStorage.clear();
  }

  
  
  public get loggedIn():boolean{
   return !!localStorage.getItem('access-token');
  
  }
}
