import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chat } from '../../Chat';
import { Message } from '../../Message';
import { TechnicianService } from '../services/technician.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-technician',
  templateUrl: './chat-technician.component.html',
  styleUrls: ['./chat-technician.component.scss']
})
export class ChatTechnicianComponent implements OnInit,AfterViewChecked {
  
  
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '1';
  }



  admin!:any;
  chat!:Chat;
  reply!:string;
  messages:Array<Message>=[];
  message!: string;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private chatservice:TechnicianService){ 
    this.getReply();
  }
  private messageSubscription!: Subscription;

  ngOnInit(): void {
    this.getReply();
    
    
  }

  ngAfterViewChecked(): void {
    this.setupAutoRefresh();
  }


  getReply(){
    
        this.getMessages("2");//userId
  }

  getMessages(replay:string){
    this.chatservice.getMessages(2).subscribe({
      next:(data:any)=>{
        console.log("hello");
        console.log(data.message);
          this.chat=data;
          this.messages=data.messageDTOS
          this.scrollToBottom();

      },
      error:err=>console.log(err)
    })
  }
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    } catch(err) {
      console.error('Scroll to bottom failed', err);
    }
  }
  handlesubmit() {
    if(this.message){
      console.log(this.message);
      this.chatservice.addMessage("1",this.message,"2").subscribe({
      next:data=>{
          this.getMessages("2");
          this.message="";
      },
      error:err=>console.log(err)
    })
    }
    
  }
  setupAutoRefresh(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.messageSubscription = interval(1000).subscribe(() => {
      if (this.reply) {
        this.getMessages(this.reply);
      }
    });
  }


}