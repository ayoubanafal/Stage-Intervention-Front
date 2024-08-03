import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable, Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { ChatMessageDto } from '../../components/chat/ChatMessageDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASIC_URL="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

    webSocket!: WebSocket;
    chatMessages: ChatMessageDto[] = [];
  
    constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization' , 'Bearer ' + StorageService.getToken()
    )
  }

  getUserById(id:string): Observable<any>
  {
    return this.http.get(BASIC_URL + "api/user/user/"+id ,
      { headers: this.createAuthorizationHeader()})
  }
  
    public openWebSocket(){
      this.webSocket = new WebSocket('ws://localhost:8080/chat');
  
      this.webSocket.onopen = (event) => {
        console.log('Open: ', event);
      };
  
      this.webSocket.onmessage = (event) => {
        const chatMessageDto = JSON.parse(event.data);
        this.chatMessages.push(chatMessageDto);
      };
  
      this.webSocket.onclose = (event) => {
        console.log('Close: ', event);
      };
    }
  
    public sendMessage(chatMessageDto: ChatMessageDto){
      this.webSocket.send(JSON.stringify(chatMessageDto));
    }
  
    public closeWebSocket() {
      this.webSocket.close();
    }
  }
