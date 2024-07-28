import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css',
    '../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class ProfileComponent {
  isRequesterLoggedIn = StorageService.isRequesterLoggedIn();
  isAdminLoggedIn = StorageService.isAdminLoggedIn();
  isTechnicianLoggedIn = StorageService.isTechnicianLoggedIn();
  id = Number(StorageService.getUserId());
  user:any;
  profileForm !: FormGroup;

  constructor(private router:Router,
    private authService:AuthService,
    private route: ActivatedRoute,
  private fb:FormBuilder,
  private snackbar:MatSnackBar
  ){
    this.getUserById();
    this.profileForm=this.fb.group
  ({
    name:[null,[Validators.required]],
    phone:[null,[Validators.required]],
    position:[null,[Validators.required]],
    email:[null,[Validators.required]],
    password:[null,[Validators.required]],
    confirmPassword:[null,[Validators.required]]
  })
  }

  ngOnInit(){
    this.router.events.subscribe(event => {
      this.isRequesterLoggedIn=StorageService.isRequesterLoggedIn();
      this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
      this.isTechnicianLoggedIn=StorageService.isTechnicianLoggedIn();
    })
  }
  getUserById(){
    this.authService.getUserById(this.id).subscribe((res)=>{
      this.user=res;
      this.profileForm.patchValue(res);
      console.log(this.user);
    })
  }


  onSubmit()
{
  //console.log(this.signupForm.value);
  const password = this.profileForm.get("password")?.value;
  const confirmPassword = this.profileForm.get("confirmPassword")?.value;
  if(password !== confirmPassword){
    this.snackbar.open("Passwords do not match","Close",{duration:5000,panelClass:"error-snackbar"});
    return;
  }

  this.authService.updateUser(this.id,this.profileForm.value).subscribe((res) => {
    console.log(res);
    if(res.id != null)
    {
      this.snackbar.open("Update successful","Close",{duration:5000});
      this.router.navigateByUrl("/profile/"+this.id);
    }else
    {
      this.snackbar.open("Update fialed. Try again","Close",{duration: 5000,panelClass:"error-snackbar"});

    }
  })

}

}
