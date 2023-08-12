import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { Chat, Message } from 'src/app/shared/services/product-module';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  connected: boolean = false;
  newMessage: string = '';
  activeId: string = '';
  constructor(private apiCaller: AdminApiCallerService) {}

  @ViewChild('messagesContainer', { static: false })
  private messagesContainer!: ElementRef;

  private socket: any;
  ngOnInit(): void {
    this.apiCaller.getChats((data: Chat[]) => {
      this.Chats = data;
    });
  }

  Chats: Chat[] = [];
  Messages: Message[] = [];

  getMessages(_id: string) {
    this.activeId = _id;
    let index = this.Chats.findIndex((x) => x._id === _id);
    this.apiCaller.getMessages(_id, (data: Message[]) => {
      this.Messages = data;
      this.Chats[index].Messages = data;
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      });
    });
    this.connectToChat(_id, index);
  }

  connectToChat(_id: string, index: number) {
    if (this.connected === false) {
      this.socket = io('https://api.skinopedia-lb.com', {
        secure: true,
      });
      this.socket.on('connect', () => {
        console.log('Connected to server');
      });
      this.JoinRoom(_id);

      this.socket.on('Get-Message', (message: any, date: any, user: any) => {
        console.log(`received message: ${message}`);
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
        let messageObj: Message = {
          message: message,
          date: date,
          user: user,
          type: 'received',
        };
        this.Chats[index].Messages.push(messageObj);
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      });
    }
    this.connected = true;
  }

  JoinRoom(_id: string) {
    console.log('Joining Room');
    this.socket.emit('Join-Chat', _id, (message: any) => {});
  }

  SendMessage() {
    let index = this.Chats.findIndex((x) => x._id === this.activeId);
    if (this.socket.connected) {
      this.socket.emit('Send-Message', 1, this.newMessage, this.activeId);
      let messageObj: Message = {
        message: this.newMessage,
        date: new Date(),
        user: 'Serena',
        type: 'sent',
      };
      this.Chats[index].Messages.push(messageObj);
      this.newMessage = '';
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } else {
      alert('You are disconnected. Please reconnect before sending a message.');
    }
  }
}
