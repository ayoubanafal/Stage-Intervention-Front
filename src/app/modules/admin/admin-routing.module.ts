import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentA } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponentA}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
