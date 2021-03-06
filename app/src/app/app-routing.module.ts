import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { GroupsComponent } from './groups/groups.component';
import { PhotosComponent } from './photos/photos.component';
import { ProfileComponent } from './profile/profile.component';
import {RegisterComponent} from './register/register.component'
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'member',component:MemberComponent,canActivate:[AuthGuard]},
  {path:'groups',component:GroupsComponent,canActivate:[AuthGuard]},
  {path:'photos',component:PhotosComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/register', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
