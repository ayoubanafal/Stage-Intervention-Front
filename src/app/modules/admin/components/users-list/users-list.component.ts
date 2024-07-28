import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class UsersListComponent {
  userRoles=['ALL','Requester','Technician'];
  employees:any=[];
  searchFrom!: FormGroup;
  filterStatus='';

  constructor(private adminService:AdminService,
    private fb:FormBuilder,
    private snackBar : MatSnackBar
  ){
    this.getAllUsers();
    this.searchFrom = this.fb.group({
      name:[null]
    })
  }

  getAllUsers(){
    if (this.filterStatus == '' || this.filterStatus=='ALL'){
      this.employees=[];
      this.adminService.getUsers().subscribe((res:any[]) =>{
        this.employees = res;
        })
    }
    else if (this.filterStatus){
      this.employees=[];
       this.adminService.getUsers().subscribe((res:any[]) =>{
       this.employees = res.filter(user => user.userRole == this.filterStatus);
      })
    }
    
   }

   searchUsers(){
    this.employees=[];
    const name = this.searchFrom.get('name')!.value;
    if(name!=''){
    this.adminService.searchUsers(name).subscribe((res)=>{
      this.employees=res;
    })}
    else
    this.getAllUsers();
  }
  setAsRequester(id:number){
    this.adminService.setAsRequester(id).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("User Has Been Set As A Requester Successfully", "Close",{ duration: 5000});
        this.getAllUsers();
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
      }
      
    })
  }

  setAsTechnician(id:number){
    this.adminService.setAsTechnician(id).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("User Has Been Set As A Technician Successfully", "Close",{ duration: 5000});
        this.getAllUsers();
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
      }
    })
  }
}
