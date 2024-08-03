import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponentA } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from 'src/app/DemoAngularMaterialModule';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RequestAssigningComponent } from './components/request-assigning/request-assigning.component';
import { TechnicianAssigningComponent } from './components/technician-assigning/technician-assigning.component';
import { SeeAssignedRequestsComponent } from './components/see-assigned-requests/see-assigned-requests.component';


@NgModule({
  //DashboardComponentA
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule
  ]
})
export class AdminModule { }
