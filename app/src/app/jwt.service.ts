import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
 email:string;
//  setEmail(data){
//     this.email=data;
//  }

 getEmail(){
   return this.email;
 }

  constructor(private http: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
  login(email: string, password: string):Observable<any>{
     this.email=email;
      return this.http.post<any>('http://localhost:8081/user/login',{email,password},this.httpOptions);
  }

  create(userName:string,email: string, password: string):Observable<any>{
    return this.http.post<any>('http://localhost:8081/user',{userName,email,password},this.httpOptions);
  }

  getById(email: string):Observable<any>{
    return this.http.get<any>(`http://localhost:8081/profile/${email}`,this.httpOptions)
  }
  
  logout() {
    this.email="";
  localStorage.removeItem('access_token');
  }
  
  public get loggedIn(): boolean {
  return localStorage.getItem('access_token') !== null;
  }
}
