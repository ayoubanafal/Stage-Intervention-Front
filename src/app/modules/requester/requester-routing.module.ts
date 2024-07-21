import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostRequestComponent } from './components/post-request/post-request.component';
import { UpdateRequestComponent } from './components/update-request/update-request.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "request", component: PostRequestComponent},
  {path: "request/:requestId/edit", component: UpdateRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequesterRoutingModule { }
