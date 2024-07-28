import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TechnicianService } from '../../services/technician.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class RequestsListComponent {
  listOfRequests:any=[];
  filterStatus = '';
  statusOptions = ['ALL','PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  searchFrom!: FormGroup;
  technicianId:string;
  constructor(private technicianService:TechnicianService,
    private fb:FormBuilder,
    private snackBar : MatSnackBar
  ){
  this.technicianId=StorageService.getUserId();
  this.getAllClaimedRequests();
  this.searchFrom = this.fb.group({
    title:[null]
  })
  }

  getAllClaimedRequests(){
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
   archiveRequest(requestId : number){
    this.technicianService.archiveRequest(requestId).subscribe((res) => {
      this.snackBar.open("Request Archived Successfully", "Close", { duration: 5000 });
      this.getAllClaimedRequests();
    }
  );
}
///////////////////////////////////////////////////////
  //  UnClaimRequest(requestId : number){
  //   this.technicianService.UnClaimRequest(requestId).subscribe((res) =>{
  //     this.snackBar.open("Request UnClaimed Successfully", "Close",{ duration: 5000});
  //     this.getAllClaimedRequests();
  // })
  //  }

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
