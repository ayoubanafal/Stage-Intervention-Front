import { Component, OnDestroy, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/auth/services/notification/notification.service';

@Component({
  selector: 'app-dashboard-t',
  templateUrl: './dashboard-t.component.html',
  styleUrls: ['./dashboard-t.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class DashboardTComponent implements OnInit, OnDestroy {
  constructor(private webSocketService: NotificationService,
    private storageService:StorageService
  ) {}

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

