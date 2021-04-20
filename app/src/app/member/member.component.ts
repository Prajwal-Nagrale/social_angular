import { Component, OnInit ,TemplateRef} from '@angular/core';
import {JwtService} from '../jwt.service';
import {Router} from '@angular/router';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { NgxPaginationModule} from 'ngx-pagination';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  modalRef: BsModalRef;
  model:any;
  profileEmail:string;
  friendEmail:string;
  email:string;
  name:string; 
  city:string;
  state:string;
  gender:string;
  profession:string;
  img:string='assets/img/user.png';
  msg:boolean=false;
  friendStatus:string="false";
  data = [];
  pagenumber = 1;
  total = 10;

  public openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  addRequest(email:string){
    this.jwt.updateFriend(this.profileEmail,email,this.friendStatus).subscribe((data)=>{
      console.log(data);
    })
  }


  viewProfile(email:string){
    this.jwt.getById(email).subscribe((data)=>{
      //console.log(data.message[0]);
      this.name=data.message[0].userName;
      this.city=data.message[0].city;
      this.state=data.message[0].state;
      this.gender=data.message[0].gender;
      this.profession=data.message[0].profession;
      this.img=data.message[0].img;
      if(!this.img){
        this.img='assets/img/user.png';
      }
    })
  }

  constructor(private jwt:JwtService,private router:Router,private modalService: BsModalService ) { }

  ngOnInit(): void {
    this.profileEmail=this.jwt.getEmail();
    if(this.profileEmail){
      this.msg=true;
      this.jwt.getAllUser().subscribe((data)=>{
        //console.log(data.message)
        this.model=data.message;
        this.total = this.model.length;
      })
    }

  }

}
