import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageDto } from './ChatMessageDto';
import { ChatServiceService } from '../../services/chat/chat-service.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
//import { ChatServiceService } from '../../services/chat/chat-service.service';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss',
    '../../../../assets/css/nucleo-icons.css',
    '../../../../assets/css/nucleo-svg.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  user:any;
  name!:string;

  constructor(public webSocketService: ChatServiceService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.getUserName();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.name, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }
  getUserName(){
    this.webSocketService.getUserById(StorageService.getUserId()).subscribe((res)=>{
      this.user=res;
      this.name=this.user.name;
    })
  }

  // user: any;
  // name!: string;
  // recipient!: string; // Add recipient field
  // chatMessages: ChatMessageDto[] = [];

  // constructor(public webSocketService: ChatServiceService, private storageService: StorageService) { }

  // ngOnInit(): void {
  //   this.webSocketService.openWebSocket();
  //   this.getUserName();
  // }

  // ngOnDestroy(): void {
  //   this.webSocketService.closeWebSocket();
  // }

  // sendMessage(sendForm: NgForm) {
  //   const chatMessageDto = new ChatMessageDto(this.name, this.recipient, sendForm.value.message);
  //   this.webSocketService.sendMessage(chatMessageDto);
  //   sendForm.controls['message'].reset();
  // }

  // getUserName() {
  //   this.webSocketService.getUserById(StorageService.getUserId()).subscribe((res) => {
  //     this.user = res;
  //     this.name = this.user.name;
  //   });
  // }
}

