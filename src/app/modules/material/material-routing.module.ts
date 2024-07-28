import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMaterialComponent } from './components/all-material/all-material.component';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { UpdateMaterialComponent } from './components/update-material/update-material.component';
import { DeleteMaterialComponent } from './components/delete-material/delete-material.component';

const routes: Routes = [
{ path: "allMaterial", component:AllMaterialComponent},
{ path: "addMaterial", component:AddMaterialComponent},
{ path: "updateMaterial/:materialId/edit", component:UpdateMaterialComponent},
{ path: "deleteMaterial/:materialId/delete", component:DeleteMaterialComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
