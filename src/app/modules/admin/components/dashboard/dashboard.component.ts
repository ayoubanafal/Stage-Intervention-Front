import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponentA {
  listOfEmployees: any=[];
constructor(private adminService:AdminService){
  this.getUsers();
}
getUsers(){
  this.adminService.getUsers().subscribe((res)=>{
    this.listOfEmployees=res;
    console.log(res);
  })
}

}
