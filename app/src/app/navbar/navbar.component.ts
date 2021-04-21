import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  msg:boolean;
  
  constructor(private jwt:JwtService) { }

  ngOnInit(): void {
    this.msg=this.jwt.loggedIn;
  }
}
