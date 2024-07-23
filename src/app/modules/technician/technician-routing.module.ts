import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTComponent } from './components/dashboard-t/dashboard-t.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';

const routes: Routes = [
  {path: "dashboardT",component:DashboardTComponent},
  {path: "requestsList",component:RequestsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
