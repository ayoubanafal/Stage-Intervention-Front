import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css',
    '../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class LoginComponent {
  loginForm! : FormGroup;
  hidePassword = true;
  
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private snackbar: MatSnackBar,
    private router:Router){
    this.loginForm=this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
    })
  }
  
  togglePasswordVisibility(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.hidePassword = !this.hidePassword;
  }
  onSubmit()
  {
    console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe((res) => {
    console.log(res);
    if(res.userId != null)
    {
      const user={
        id: res.userId,
        role: res.userRole
      }
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);

      if(StorageService.isAdminLoggedIn())
        this.router.navigateByUrl("/admin/requestAssigning");
      else if(StorageService.isRequesterLoggedIn())
        this.router.navigateByUrl("/requester/dashboard");
      else if(StorageService.isTechnicianLoggedIn())
        this.router.navigateByUrl("/technician/requestsList");

      this.snackbar.open("Login successful","Close",{duration:5000});
    }else
    {
      this.snackbar.open("Invalid credentials","Close",{duration: 5000,panelClass:"error-snackbar"});

    }
  })
  }
}
