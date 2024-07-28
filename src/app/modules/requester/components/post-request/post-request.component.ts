import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequesterService } from '../../services/requester.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-request',
  templateUrl: './post-request.component.html',
  styleUrls: ['./post-request.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class PostRequestComponent {

  requestForm !: FormGroup;
  //listOfMaterials:any=['LAPTOP','PC','SERVER'];
  listOfPriorities: any = ['LOW' , "MEDIUM" , "HIGH"];

constructor(private fb:FormBuilder,
  private requesterService:RequesterService,
  private snackBar:MatSnackBar,
  private router:Router)
{const currentDate = new Date(); 
  console.log(currentDate);
  this.requestForm=this.fb.group
  ({
    requesterId:[null,[Validators.required]],
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    lastUpdate:[null,[Validators.required]],
    creationDate:[currentDate,[Validators.required]],
    priority:[null,[Validators.required]],
    //material:[null,[Validators.required]]
  })
const requesterId = StorageService.getUserId();
    if (requesterId) 
    {
      this.requestForm.patchValue({ requesterId });
    }
}


postRequest(){
  console.log(this.requestForm.value);
  this.requesterService.postRequest(this.requestForm.value).subscribe((res)=>{
    if(res.requestId != null){
      this.snackBar.open("Request posted successfully", "Close",{ duration: 5000});
      this.router.navigateByUrl("/requester/dashboard");
    }else{
      this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
    }
  })
}

}
