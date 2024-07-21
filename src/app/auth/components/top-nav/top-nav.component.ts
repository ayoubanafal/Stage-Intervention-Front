import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css',
    '../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class TopNavComponent {
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
  lo(){
    console.log("testo");
  }
}
