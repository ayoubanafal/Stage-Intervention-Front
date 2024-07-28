import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { AllMaterialComponent } from './components/all-material/all-material.component';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { UpdateMaterialComponent } from './components/update-material/update-material.component';
import { DeleteMaterialComponent } from './components/delete-material/delete-material.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule
  ]
})
export class MaterialModule { }
