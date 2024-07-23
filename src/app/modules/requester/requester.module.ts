import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequesterRoutingModule } from './requester-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppModule } from 'src/app/app.module';
import { PostRequestComponent } from './components/post-request/post-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from 'src/app/DemoAngularMaterialModule';
import { UpdateRequestComponent } from './components/update-request/update-request.component';


@NgModule({
  //DashboardComponent
  //    PostRequestComponent
  //UpdateRequestComponent
  declarations: [
      
  ],
  imports: [
    CommonModule,
    RequesterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule
  ]
})
export class RequesterModule { }
