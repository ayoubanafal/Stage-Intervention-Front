import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnicianService } from 'src/app/modules/technician/services/technician.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-technician-assigning',
  templateUrl: './technician-assigning.component.html',
  styleUrls: ['./technician-assigning.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class TechnicianAssigningComponent {
  requestId: number=this.route.snapshot.params["requestId"];
  updateFrom!: FormGroup;
  ListOfTechnicians:any=[];
  statusOptions = ['PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  listOfPriorities: any = ['LOW' , "MEDIUM" , "HIGH"];

  constructor(private adminService:AdminService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private router:Router
  ){
    this.getRequestById();
  this.updateFrom=this.fb.group
  ({
    requesterId:[null,[Validators.required]],
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    lastUpdate:[null,[Validators.required]],
    creationDate:[null,[Validators.required]],
    priority:[null,[Validators.required]],
    status:[null,[Validators.required]],
    technicianId:[null,[Validators.required]]
  })
  }
  getAllTechnicians() {
    this.ListOfTechnicians=[];
    this.adminService.getUsersT().subscribe((res:any[]) => {
      this.ListOfTechnicians = res;
  });
    
  }
  getRequestById(){
this.adminService.getRequestById(this.requestId).subscribe((res) => {
    res.lastUpdate = this.formatDate(res.lastUpdate);
    this.getAllTechnicians();
  this.updateFrom.patchValue(res);
  console.log(this.updateFrom.value);
})}
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


  updateRequestTechnician(){
    const technicianId=this.updateFrom.get('technicianId')!.value;
    console.log(technicianId);
    this.adminService.updateRequestTechnician(this.requestId,technicianId).subscribe((res: { requestId: null; }) =>{
      if(res.requestId != null){
        this.snackBar.open("Request Has Been Assigned Successfully", "Close",{ duration: 5000});
        this.router.navigateByUrl("/admin/requestAssigning");
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
      }
    })
   }
}
