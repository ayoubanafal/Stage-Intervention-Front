import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialServiceService } from '../../services/material-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class AddMaterialComponent {
  MaterialId: number=this.route.snapshot.params["materialId"];
  addMaterialForm !: FormGroup;
  listOfStatus: any = ['ALL','Perfect','Good','Usable','Needs To Be Changed'];

constructor(private materialService: MaterialServiceService,
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private snackBar:MatSnackBar,
  private router:Router
){
  this.addMaterialForm=this.fb.group
  ({
    name:[null,[Validators.required]],
    detailedDescription:[null,[Validators.required]],
    integrationDate:[null,[Validators.required]],
    lifeSpan:[null,[Validators.required]],
    location:[null,[Validators.required]],
    status:[null,[Validators.required]]
  })
}


addMaterial(){
  console.log(this.addMaterialForm.value);
  this.materialService.addMaterial(this.addMaterialForm.value).subscribe((res)=>{
    if(res.materialId != null){
      this.snackBar.open("Material Added Successfully", "Close",{ duration: 5000});
      this.router.navigateByUrl("/material/allMaterial");
    }else{
      this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
    }
  })
}
}
