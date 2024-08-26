import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from 'src/app/auth/services/notification/notification.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class DashboardComponentA {
  listOfEmployees: any=[];
constructor(private adminService:AdminService,
  private webSocketService:NotificationService
){
}
ngOnInit(): void {
  this.webSocketService.connect(StorageService.getUserId());
  this.webSocketService.messages.subscribe(message => {
    // Handle incoming notification
    alert(`Notification: ${message}`);
  });
}

ngOnDestroy(): void {
  this.webSocketService.disconnect();
}

}
