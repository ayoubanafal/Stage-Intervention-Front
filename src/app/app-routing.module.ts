import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { RequesterRoutingModule } from './modules/requester/requester-routing.module';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { ChatComponent } from './auth/components/chat/chat.component';

const routes: Routes = [
  { path: "login", component:LoginComponent},
  { path: "signup", component:SignupComponent},
  { path: "profile/:id", component:ProfileComponent},
  { path: "chat", component:ChatComponent},
  { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(e => e.AdminModule) },
  { path: "requester", loadChildren: () => import("./modules/requester/requester.module").then(e => e.RequesterModule) },
  { path: "technician", loadChildren: () => import("./modules/technician/technician.module").then(e => e.TechnicianModule) },
  { path: "material", loadChildren: () => import("./modules/material/material.module").then(e => e.MaterialModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RequesterRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
