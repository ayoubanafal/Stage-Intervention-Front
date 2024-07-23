import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentA } from './components/dashboard/dashboard.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponentA},
  {path: "usersList", component: UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
