import { Component, OnInit } from '@angular/core';
import { JwtService } from './jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private jwt:JwtService) { }

  ngOnInit(): void {
    this.jwt.autoSignIn();
  }
}
