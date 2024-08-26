import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageDto } from './ChatMessageDto';
import { ChatServiceService } from '../../services/chat/chat-service.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
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
  user2:any;
  admin!:string;
  selectedName!:string;
  id:any;
  idn:any;
  name!:string;
  ListOfTechnicians:any=[];
  selectedTechnicianId!: string;
  currentUserId=StorageService.getUserId();
  isAdminLoggedIn = StorageService.isAdminLoggedIn();
  chatMessages: ChatMessageDto[] = [];
  constructor(public webSocketService: ChatServiceService,
    private adminService:AdminService, 
    private cdr: ChangeDetectorRef) { 
      this.getAllTechnicians();
     }

  getAllTechnicians() {
    this.ListOfTechnicians=[];
    this.adminService.getUsersT().subscribe((res:any[]) => {
      this.ListOfTechnicians = res;
  });   
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.getUserName();
    this.id=1;
    if(this.currentUserId!=this.id)
    this.fetchRecentMessages();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  fetchRecentMessages() {
    this.id=1;
    if(this.currentUserId==this.id)
      this.getUserNameUsingSelectedTechnician(this.selectedTechnicianId);
    else
      this.getUserNameUsingSelectedTechnician(this.currentUserId);
    if(this.currentUserId==this.id){
    this.webSocketService.getRecentMessages(this.selectedTechnicianId).subscribe((messages: ChatMessageDto[]) => {
      this.webSocketService.chatMessages = messages;
    });}
    else
    {
      this.webSocketService.getRecentMessages(this.currentUserId).subscribe((messages: ChatMessageDto[]) => {
        this.webSocketService.chatMessages = messages;
        this.cdr.detectChanges();
      });}
  } 
  onTechnicianSelect(event: any) {
    this.selectedTechnicianId = event.target.value;
    this.fetchRecentMessages();
  }

  sendMessage(sendForm: NgForm) {
    this.id=1;
    const chatMessageDto = new ChatMessageDto(this.name, sendForm.value.message,this.selectedTechnicianId);

    if(this.currentUserId!=this.id)
      chatMessageDto.technicianId=this.currentUserId;
    else
    chatMessageDto.technicianId=this.selectedTechnicianId;

    if(this.currentUserId==this.id)
          this.getUserNameUsingSelectedTechnician(this.selectedTechnicianId);
        else
          this.getUserNameUsingSelectedTechnician(this.currentUserId);


    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }
  getUserName(){
    this.webSocketService.getUserById(StorageService.getUserId()).subscribe((res)=>{
      this.user=res;
      this.admin="admin";
      this.name=this.user.name;
    }) 
  }
  getUserNameUsingSelectedTechnician(id:string){
    this.webSocketService.getUserById(id).subscribe((res)=>{
      this.selectedName=res.name;
    })
  }

}

