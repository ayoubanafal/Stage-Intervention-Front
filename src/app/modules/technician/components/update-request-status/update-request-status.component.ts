import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicianService } from '../../services/technician.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-request-status',
  templateUrl: './update-request-status.component.html',
  styleUrls: ['./update-request-status.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class UpdateRequestStatusComponent {
  requestId: number=this.route.snapshot.params["requestId"];
  updateFrom!: FormGroup;
  statusOptions = ['PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  listOfPriorities: any = ['LOW' , "MEDIUM" , "HIGH"];

  constructor(private technicianService:TechnicianService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private router:Router
  ){
    this.getRequestByIdT();
  this.updateFrom=this.fb.group
  ({
    requesterId:[null,[Validators.required]],
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    lastUpdate:[null,[Validators.required]],
    creationDate:[null,[Validators.required]],
    priority:[null,[Validators.required]],
    status:[null,[Validators.required]]
  })
  }

  getRequestByIdT(){
    console.log(this.requestId);
this.technicianService.getRequestByIdT(this.requestId).subscribe((res) => {
  if (res.lastUpdate) {
    res.lastUpdate = this.formatDate(res.lastUpdate);
  }
  this.updateFrom.patchValue(res);
  console.log(res);
})}
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


  updateRequestStatus(){
    const status=this.updateFrom.get('status')!.value;
    this.technicianService.updateRequestStatus(this.requestId,status).subscribe((res) =>{
      if(res.requestId != null){
        this.snackBar.open("Request Status Updated Successfully", "Close",{ duration: 5000});
        this.router.navigateByUrl("/technician/requestsList");
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
      }
    })
   }
}
