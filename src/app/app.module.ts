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
    UsersListComponent
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
