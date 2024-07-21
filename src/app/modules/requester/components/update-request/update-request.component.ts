import { Component } from '@angular/core';
import { RequesterService } from '../../services/requester.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class UpdateRequestComponent {

  requestId: number=this.route.snapshot.params["requestId"];
  updateRequestForm !: FormGroup;
  //listOfMaterials:any=['LAPTOP','PC','SERVER'];
  listOfPriorities: any = ['LOW' , "MEDIUM" , "HIGH"];

constructor(private requesterService: RequesterService,
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private snackBar:MatSnackBar,
  private router:Router
){
  this.getRequestById();
  this.updateRequestForm=this.fb.group
  ({
    requesterId:[null,[Validators.required]],
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    lastUpdate:[null,[Validators.required]],
    creationDate:[null,[Validators.required]],
    priority:[null,[Validators.required]],
    //material:[null,[Validators.required]]
  })
}

getRequestById(){
this.requesterService.getRequestById(this.requestId).subscribe((res) => {
  if (res.lastUpdate) {
    res.lastUpdate = this.formatDate(res.lastUpdate);
  }
  this.updateRequestForm.patchValue(res);
  console.log(res);
})
}
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

updateRequest(){
  console.log(this.updateRequestForm.value);
  this.requesterService.updateRequest(this.requestId,this.updateRequestForm.value).subscribe((res)=>{
    if(res.requestId != null){
      this.snackBar.open("Request Updated successfully", "Close",{ duration: 5000});
      this.router.navigateByUrl("/requester/dashboard");
    }else{
      this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
    }
  })
}

}
