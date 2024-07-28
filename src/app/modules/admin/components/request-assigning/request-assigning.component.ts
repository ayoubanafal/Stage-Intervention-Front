import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-assigning',
  templateUrl: './request-assigning.component.html',
  styleUrls: ['./request-assigning.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class RequestAssigningComponent {//////////////////////////////////////UnAssigned requests 


  listOfRequests:any=[];
  searchFrom!: FormGroup;

constructor(private adminService:AdminService,
  private fb:FormBuilder,
  private snackBar : MatSnackBar
){
this.getAllAvailableRequests();
this.searchFrom = this.fb.group({
  title:[null]
})
}


getAllAvailableRequests(){
    this.listOfRequests=[];
    this.adminService.getAllAvailableRquests().subscribe((res:any[]) =>{
      this.listOfRequests = res;;
      })
  }

  searchRequest(){
    this.listOfRequests=[];
    const title = this.searchFrom.get('title')!.value;
    if(title!=''){
    this.adminService.searchRequest(title).subscribe((res)=>{
      this.listOfRequests=res;
    })}
    else
    this.getAllAvailableRequests();
  }
// assignRequest(requestId : number){
//   this.adminService.assignRequest(requestId,this.technicianId).subscribe((res) =>{
//       this.snackBar.open("Request Claimed successfully", "Close",{ duration: 5000});
//       this.getAllAvailableRequests();
//   })
// }
}

