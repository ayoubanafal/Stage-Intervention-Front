import { Component } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-t',
  templateUrl: './dashboard-t.component.html',
  styleUrls: ['./dashboard-t.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class DashboardTComponent {

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
this.getAllAvailableRequests();
this.searchFrom = this.fb.group({
  title:[null]
})
}


getAllAvailableRequests(){
  console.log(StorageService.getToken());
 if (this.filterStatus && this.filterStatus !== 'ALL'){
    this.listOfRequests=[];
    this.technicianService.getAllAvailableRquests().subscribe((res:any[]) =>{
      this.listOfRequests = res.filter((request: { status: string; }) => request.status==this.filterStatus);
      })
  }
  else{
    this.listOfRequests=[];
     this.technicianService.getAllAvailableRquests().subscribe((res:any[]) =>{
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
  this.getAllAvailableRequests();
}
claimRequest(requestId : number){
  this.technicianService.claimRequest(requestId,this.technicianId).subscribe((res) =>{
      this.snackBar.open("Request Claimed successfully", "Close",{ duration: 5000});
      this.getAllAvailableRequests();
  })
}

}
