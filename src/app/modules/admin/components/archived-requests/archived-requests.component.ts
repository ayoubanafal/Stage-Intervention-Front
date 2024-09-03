import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-archived-requests',
  templateUrl: './archived-requests.component.html',
  styleUrls: ['./archived-requests.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class ArchivedRequestsComponent  {
  status=['ALL','PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  listOfRequests:any=[];
  //employees:any=[];
  searchFrom!: FormGroup;
  filterStatus='';
  Id: string=this.route.snapshot.params["id"];

  constructor(private adminService:AdminService,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private route: ActivatedRoute,
    private router:Router
  ){
    this.getAllArchivedRequests();
    this.searchFrom = this.fb.group({
      title:[null]
    })
  }

  getAllArchivedRequests(){
    if (this.filterStatus=='ALL' || this.filterStatus==''){
      this.listOfRequests=[];
      this.adminService.getArchivedRequestsByTechnicianId(this.Id).subscribe((res:any[]) =>{
        this.listOfRequests = res;
        })
    }
    else if (this.filterStatus){
      this.listOfRequests=[];
       this.adminService.getArchivedRequestsByTechnicianId(this.Id).subscribe((res:any[]) =>{
       this.listOfRequests = res.filter(requestHistory => requestHistory.status == this.filterStatus);
      })
    }
    
   }

   searchRequest(){
    this.listOfRequests=[];
    const title = this.searchFrom.get('title')!.value;
    if(title!=''){
    this.adminService.searchArchivedRequestByTitle(title).subscribe((res)=>{
      this.listOfRequests=res;
    })}
    else
    this.getAllArchivedRequests();
  }

}
