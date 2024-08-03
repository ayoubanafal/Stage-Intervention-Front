import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { TechnicianService } from 'src/app/modules/technician/services/technician.service';

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
  constructor(private technicianService:TechnicianService,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private route: ActivatedRoute,
  ){
  this.getAllClaimedRequests();
  this.searchFrom = this.fb.group({
    title:[null]
  })
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
}
