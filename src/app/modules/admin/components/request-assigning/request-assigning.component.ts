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

  unassignedRequestsCount: number = 0;
  assignedRequestsCount: number = 0;
  pendingRequestsCount: number = 0;
  InProgressRequestsCount:number = 0;
  cancelledRequestsCount:number = 0;

constructor(private adminService:AdminService,
  private fb:FormBuilder,
  private snackBar : MatSnackBar
){
this.getAllAvailableRequests();
this.searchFrom = this.fb.group({
  title:[null]
})
this.getUnassignedRequestsCount();
this.getAssignedRequestsCount();
this.getCancelledRequestsCount();
this.getInProgressRequestsCount();
this.getPendingRequestsCount();
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
  getUnassignedRequestsCount() {
    this.adminService.countUnassignedRequestsByTechnicianId().subscribe((res)=>{
      this.unassignedRequestsCount=res;
      console.log(res);
    }
      
    );
  }
  getAssignedRequestsCount() {
    this.adminService.countAllAssignedRequests().subscribe((res)=>{
      this.assignedRequestsCount=res;
      console.log(res);
    }
  );
} 

getPendingRequestsCount() {
  this.adminService.countRequestsByStatus( 'PENDING').subscribe((res)=>{
    this.pendingRequestsCount=res;
    console.log(res);
  }
  );
}
getInProgressRequestsCount() {
  this.adminService.countRequestsByStatus( 'INPROGRESS').subscribe((res)=>{
    this.InProgressRequestsCount=res;
    console.log(res);
  }
  );
}
getCancelledRequestsCount() {
  this.adminService.countRequestsByStatus('CANCELLED').subscribe((res)=>{
    this.cancelledRequestsCount=res;
    console.log(res);
  }
  );
}
}

