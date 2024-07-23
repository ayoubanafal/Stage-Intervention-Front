import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',
    '../assets/css/nucleo-icons.css',
    '../assets/css/nucleo-svg.css',
    '../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class AppComponent {
  title='';

  isRequesterLoggedIn = StorageService.isRequesterLoggedIn();
  isAdminLoggedIn = StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      this.isRequesterLoggedIn=StorageService.isRequesterLoggedIn();
      this.isAdminLoggedIn=StorageService.isAdminLoggedIn();

    })
  }
  
}
