import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css',
    '../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class SignupComponent {
signupForm! : FormGroup;
hidePassword = true;

constructor(private fb: FormBuilder,
  private authService:AuthService,
  private snackbar: MatSnackBar,
  private router:Router)
  {
  this.signupForm=this.fb.group({
    name: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    position: [null, [Validators.required]],
    email: [null, [Validators.required,Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  })
}

togglePasswordVisibility(event: Event): void {
  event.preventDefault(); // Prevent form submission
  this.hidePassword = !this.hidePassword;
}
onSubmit()
{
  //console.log(this.signupForm.value);
  const password = this.signupForm.get("password")?.value;
  const confirmPassword = this.signupForm.get("confirmPassword")?.value;
  if(password !== confirmPassword){
    this.snackbar.open("Passwords do not match","Close",{duration:5000,panelClass:"error-snackbar"});
    return;
  }

  this.authService.signup(this.signupForm.value).subscribe((res) => {
    console.log(res);
    if(res.id != null)
    {
      this.snackbar.open("Signup successful","Close",{duration:5000});
      this.router.navigateByUrl("/login");
    }else
    {
      this.snackbar.open("Signup fialed. Try again","Close",{duration: 5000,panelClass:"error-snackbar"});

    }
  })

}


}
