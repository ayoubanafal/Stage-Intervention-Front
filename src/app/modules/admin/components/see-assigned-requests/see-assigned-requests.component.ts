import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { TechnicianService } from 'src/app/modules/technician/services/technician.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-see-assigned-requests',
  templateUrl: './see-assigned-requests.component.html',
  styleUrls: ['./see-assigned-requests.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class SeeAssignedRequestsComponent {
  Id: number=this.route.snapshot.params["id"];
  name: string=this.route.snapshot.params["name"];
  technicianId: string='';
  listOfRequests:any=[];
  filterStatus = '';
  statusOptions = ['ALL','PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  searchFrom!: FormGroup;
  unassignedRequestsCount: number = 0;
  assignedRequestsCount: number = 0;
  pendingRequestsCount: number = 0;
  InProgressRequestsCount:number = 0;
  deferredRequestsCount:number = 0;
  cancelledRequestsCount:number = 0;
  constructor(private technicianService:TechnicianService,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private route: ActivatedRoute,
    private adminService:AdminService
  ){
  this.getAllClaimedRequests();
  this.searchFrom = this.fb.group({
    title:[null]
  })
  this.getUnassignedRequestsCount();
    this.getAssignedRequestsCount();
    this.getPendingRequestsCount();
    this.getInProgressRequestsCount();
    this.getDeferredRequestsCount();
    this.getCancelledRequestsCount();
  }


  getAllClaimedRequests(){
    this.technicianId=this.Id.toString();
    if (this.filterStatus && this.filterStatus !== 'ALL'){
       this.listOfRequests=[];
       this.technicianService.getAllClaimedRquests(this.technicianId).subscribe((res:any[]) =>{
         this.listOfRequests = res.filter((request: { status: string; }) => request.status==this.filterStatus);
         })
     }
     else{
       this.listOfRequests=[];
        this.technicianService.getAllClaimedRquests(this.technicianId).subscribe((res:any[]) =>{
        this.listOfRequests = res.filter((request: { status: string; }) => request.status != 'COMPLETED');
       })
     }
   }

searchRequest(){
  this.listOfRequests=[];
  const title = this.searchFrom.get('title')!.value;
  if(title!=''){
  this.technicianService.searchRequest(title).subscribe((res)=>{
    this.listOfRequests=res;
  })}
  else
 this.getAllClaimedRequests();
}
getUnassignedRequestsCount() {
  this.adminService.countUnassignedRequestsByTechnicianId().subscribe((res)=>{
    this.unassignedRequestsCount=res;
    console.log(res);
  }
    
  );
}

getAssignedRequestsCount() {
    this.adminService.countAssignedRequestsByTechnicianId(this.Id).subscribe((res)=>{
      this.assignedRequestsCount=res;
      console.log(res);
    }
  );
} 

getPendingRequestsCount() {
  this.adminService.countRequestsByStatusAndTechnicianId(this.Id, 'PENDING').subscribe((res)=>{
    this.pendingRequestsCount=res;
    console.log(res);
  }
  );
}
getInProgressRequestsCount() {
  this.adminService.countRequestsByStatusAndTechnicianId(this.Id, 'INPROGRESS').subscribe((res)=>{
    this.InProgressRequestsCount=res;
    console.log(res);
  }
  );
}
getDeferredRequestsCount() {
  this.adminService.countRequestsByStatusAndTechnicianId(this.Id, 'DEFERRED').subscribe((res)=>{
    this.deferredRequestsCount=res;
    console.log(res);
  }
  );
}
getCancelledRequestsCount() {
  this.adminService.countRequestsByStatusAndTechnicianId(this.Id, 'CANCELLED').subscribe((res)=>{
    this.cancelledRequestsCount=res;
    console.log(res);
  }
  );
}


}
