import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialServiceService } from '../../services/material-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class UpdateMaterialComponent {
  materialId: number=this.route.snapshot.params["materialId"];
  updateMaterialForm !: FormGroup;
  listOfStatus: any = ['ALL','Perfect','Good','Usable','Needs To Be Changed'];

constructor(private materialService: MaterialServiceService,
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private snackBar:MatSnackBar,
  private router:Router
){
  this.getMaterialById();
  this.updateMaterialForm=this.fb.group
  ({
    name:[null,[Validators.required]],
    detailedDescription:[null,[Validators.required]],
    integrationDate:[null,[Validators.required]],
    lifeSpan:[null,[Validators.required]],
    location:[null,[Validators.required]],
    status:[null,[Validators.required]]
  })
}

getMaterialById(){
  console.log(this.materialId);
this.materialService.getMaterialById(this.materialId).subscribe((res) => {
  if (res.integrationDate) {
    res.integrationDate = this.formatDate(res.integrationDate);
  }
  this.updateMaterialForm.patchValue(res);
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

updateMaterial(){
  console.log(this.updateMaterialForm.value);
  this.materialService.updateMaterial(this.updateMaterialForm.value,this.materialId).subscribe((res)=>{
    if(res.materialId != null){
      this.snackBar.open("Material Updated successfully", "Close",{ duration: 5000});
      this.router.navigateByUrl("/material/allMaterial");
    }else{
      this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
    }
  })
}
}
