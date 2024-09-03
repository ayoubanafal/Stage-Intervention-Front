import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentA } from './components/dashboard/dashboard.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RequestAssigningComponent } from './components/request-assigning/request-assigning.component';
import { TechnicianAssigningComponent } from './components/technician-assigning/technician-assigning.component';
import { SeeAssignedRequestsComponent } from './components/see-assigned-requests/see-assigned-requests.component';
import { ArchivedRequestsComponent } from './components/archived-requests/archived-requests.component';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponentA},
  {path: "usersList", component: UsersListComponent},
  {path: "requestAssigning", component: RequestAssigningComponent},
  {path: "technicianAssigning/:requestId", component: TechnicianAssigningComponent},
  {path: "seeAssignedRequests/:id/:name", component: SeeAssignedRequestsComponent},
  {path: "archivedRequests/:id", component: ArchivedRequestsComponent},
  {path: 'pdf-generator/:techId', component: PdfGeneratorComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
