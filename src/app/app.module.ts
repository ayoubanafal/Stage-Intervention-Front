import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './auth/components/side-nav/side-nav.component';
import { TopNavComponent } from './auth/components/top-nav/top-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './modules/requester/components/dashboard/dashboard.component';
import { DashboardComponentA } from './modules/admin/components/dashboard/dashboard.component';
import { PostRequestComponent } from './modules/requester/components/post-request/post-request.component';
import { UpdateRequestComponent } from './modules/requester/components/update-request/update-request.component';
import { DashboardTComponent } from './modules/technician/components/dashboard-t/dashboard-t.component';
import { RequestsListComponent } from './modules/technician/components/requests-list/requests-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersListComponent } from './modules/admin/components/users-list/users-list.component';
import { UpdateRequestStatusComponent } from './modules/technician/components/update-request-status/update-request-status.component';
import { RequestAssigningComponent } from './modules/admin/components/request-assigning/request-assigning.component';
import { TechnicianAssigningComponent } from './modules/admin/components/technician-assigning/technician-assigning.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { AllMaterialComponent } from './modules/material/components/all-material/all-material.component';
import { AddMaterialComponent } from './modules/material/components/add-material/add-material.component';
import { UpdateMaterialComponent } from './modules/material/components/update-material/update-material.component';
import { DeleteMaterialComponent } from './modules/material/components/delete-material/delete-material.component';
import { SeeAssignedRequestsComponent } from './modules/admin/components/see-assigned-requests/see-assigned-requests.component';
import { ChatComponent } from './auth/components/chat/chat.component';
import { ChatTechnicianComponent } from './modules/technician/chat-technician/chat-technician.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SideNavComponent,
    TopNavComponent,
    DashboardComponent,
    DashboardComponentA,
    PostRequestComponent,
    UpdateRequestComponent,
    DashboardTComponent,
    RequestsListComponent,
    UsersListComponent,
    UpdateRequestStatusComponent,
    RequestAssigningComponent,
    TechnicianAssigningComponent,
    ProfileComponent,
    AllMaterialComponent,
    AddMaterialComponent,
    UpdateMaterialComponent,
    DeleteMaterialComponent,
    SeeAssignedRequestsComponent,
    ChatComponent,
    ChatTechnicianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
