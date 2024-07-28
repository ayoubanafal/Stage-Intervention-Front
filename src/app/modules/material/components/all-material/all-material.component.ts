import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialServiceService } from '../../services/material-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-material',
  templateUrl: './all-material.component.html',
  styleUrls: ['./all-material.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class AllMaterialComponent {
  listOfMaterials:any=[];
  filterStatus = '';
  statusOptions = ['ALL','Perfect','Good','Usable','Needs To Be Changed'];
  searchFrom!: FormGroup;
  id:any;

  constructor(private materialService: MaterialServiceService,
    private snackBar : MatSnackBar,
    private fb:FormBuilder
  ){
    this.getMaterials();
    this.searchFrom = this.fb.group({
      name:[null]
    })
  }
  
  
  getMaterials(){
    if (this.filterStatus && this.filterStatus !== 'ALL'){
      this.listOfMaterials=[];
      this.materialService.getAllMaterials().subscribe((res:any[]) =>{
        this.listOfMaterials = res.filter((request: { status: string; }) => request.status==this.filterStatus);
        })
    }
    else{
      this.listOfMaterials=[];
       this.materialService.getAllMaterials().subscribe((res:any[]) =>{
      this.listOfMaterials = res;
      })
    }
   
  }
  
  
  searchRequest(){
    this.listOfMaterials=[];
    const name = this.searchFrom.get('name')!.value;
    if(name!=''){
    this.materialService.searchMaterial(name).subscribe((res)=>{
      this.listOfMaterials=res;
    })
        }
        else
        this.getMaterials();
  }
}
