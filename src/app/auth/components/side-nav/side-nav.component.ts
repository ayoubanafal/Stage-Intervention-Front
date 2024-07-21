import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css',
    '../../../../assets/css/soft-ui-dashboard-tailwind.css'
  ]
})
export class SideNavComponent {

  isRequesterLoggedIn = StorageService.isRequesterLoggedIn();
  isAdminLoggedIn = StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      this.isRequesterLoggedIn=StorageService.isRequesterLoggedIn();
      this.isAdminLoggedIn=StorageService.isAdminLoggedIn();

    })
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
  request(){
    this.router.navigateByUrl("/requester/request");
  }
}
