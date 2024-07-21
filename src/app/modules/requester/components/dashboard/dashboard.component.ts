import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequesterService } from '../../services/requester.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class DashboardComponent {

  listOfRequests:any=[];
  filterStatus = '';
  statusOptions = ['ALL','PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  requesterId: string;
  searchFrom!: FormGroup;

constructor(private requesterService: RequesterService,
  private snackBar : MatSnackBar,
  private fb:FormBuilder
){
  this.getRequests();
  this.requesterId = StorageService.getUserId();
  this.searchFrom = this.fb.group({
    title:[null]
  })
}

getRequests(){//1:54 for the get by id
  if (this.filterStatus && this.filterStatus !== 'ALL'){
    this.listOfRequests=[];
    this.requesterService.getAllRquests().subscribe((res:any[]) =>{
      this.listOfRequests = res.filter(request => request.requesterId === this.requesterId && request.status==this.filterStatus);
      this.listOfRequests = this.listOfRequests.filter((request: { status: string; }) => request.status==this.filterStatus);
      })
  }
  else{
    this.listOfRequests=[];
     this.requesterService.getAllRquests().subscribe((res:any[]) =>{
    //this.listOfRequests = res;
    this.listOfRequests = res.filter(request => request.requesterId === this.requesterId);
    this.listOfRequests = this.listOfRequests.filter((request: { status: string; }) => request.status != 'COMPLETED');

    })
  }
 
}


deleteRequest(requestId : number){
  this.requesterService.deleteRequest(requestId).subscribe((res) =>{
      this.snackBar.open("Request deleted successfully", "Close",{ duration: 5000});
      this.getRequests();
  })
}

searchRequest(){
  this.listOfRequests=[];
  const title = this.searchFrom.get('title')!.value;
  this.requesterService.searchRequest(title).subscribe((res)=>{
    this.listOfRequests=res;
  })
}
}
