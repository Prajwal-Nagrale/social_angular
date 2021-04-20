import { Component, OnInit,TemplateRef } from '@angular/core';
import {JwtService} from '../jwt.service'
import {Router} from '@angular/router'
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;
  email:string;
  name:string; 
  city:string;
  state:string;
  gender:string;
  profession:string;
  img:string='assets/img/user.png';
  msg:boolean=false;


  radioChangeHandler(event: any){
    this.gender=event.target.value;
  }

  onFileSelected(event :any){
    var fileName =event.target.files[0].name;
    this.img='assets/img/'+fileName;
  }

  updateProfile(){
    if(this.email){
      this.jwt.updateById(this.name,this.email,this.city,this.state,this.gender,this.profession,this.img).subscribe((data)=>{
        console.log("Done Updation "+this.name);
        
        //console.log(this.img);
      })
      //this.router.navigate(['/profile']);
    }
  }

  
  check(){
    this.email=this.jwt.getEmail();
    if(this.email){
      this.msg=true;
      this.jwt.getById(this.email).subscribe((data)=>{
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
    
  }

  public openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  
  constructor(private jwt:JwtService,private router:Router,private modalService: BsModalService ) {
    
   }

  ngOnInit(): void {
    this.check();
   
  }

}
