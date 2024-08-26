import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: WebSocket | undefined;
  public messages: Subject<string> = new Subject<string>();

  connect(technicianId: string): void {
    const id = technicianId;
    this.socket = new WebSocket('ws://localhost:8080/notifications/' + id);

    this.socket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
    };

    this.socket.onmessage = (event) => {
      const notification = event.data;
      this.messages.next(notification);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.warn('WebSocket connection closed:', event);
    };
  }

  sendNotification(notification: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(notification);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}