import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTComponent } from './components/dashboard-t/dashboard-t.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { UpdateRequestComponent } from '../requester/components/update-request/update-request.component';
import { UpdateRequestStatusComponent } from './components/update-request-status/update-request-status.component';

const routes: Routes = [
  {path: "dashboardT",component:DashboardTComponent},
  {path: "requestsList",component:RequestsListComponent},
  {path: "requestsStatusUpdate/:requestId",component:UpdateRequestStatusComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
