import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { io } from 'socket.io-client';
import { ApiCallsService } from '../services/api-calls.service';
import { Message, Chat } from '../services/product-module';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  @ViewChild('messagesContainer', { static: false })
  private messagesContainer!: ElementRef;

  userName = '';
  userNameEntered = false;

  newMessage: string = '';

  chatOpen: boolean = false;
  connected: boolean = false;

  chatInfo: any;

  private socket: any;

  constructor(private apiCaller: ApiCallsService) {}

  ngOnInit(): void {
    let temp = localStorage.getItem('name');
    if (temp !== null) {
      this.userNameEntered = true;
      this.chatInfo = JSON.parse(temp);
      this.messages = this.chatInfo.Messages;
    }
  }

  ngOnDestroy(): void {}

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen === true) {
      this.connectToChat();
    } else {
      this.chatInfo.Messages = this.messages;
      localStorage.setItem('name', JSON.stringify(this.chatInfo));
      this.socket.disconnect();
      console.log('Disconnected from server');
      this.connected = false;
    }
    this.apiCaller.getMessages(this.chatInfo._id, (data: Message[]) => {
      this.messages = data;
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    });
  }

  enterUserName() {
    if (this.userName !== '') {
      this.apiCaller.startChat(this.userName, () => {
        let temp = localStorage.getItem('name');
        if (temp !== null) {
          this.userNameEntered = true;
          this.chatInfo = JSON.parse(temp);
          this.connectToChat();
        }
      });
    } else {
      alert('Please enter your name');
    }
  }

  // Refresh(): void {

  // }

  JoinRoom() {
    this.socket.emit('Join-Chat', this.chatInfo._id, (message: any) => {
      console.log('Joining Room');

      //   Refresh(message)
      //   msgs.push(message);
    });
  }

  SendMessage() {
    if (this.socket.connected) {
      this.socket.emit(
        'Send-Message',
        this.chatInfo.IdUser,
        this.newMessage,
        this.chatInfo._id
      );
      let messageObj: Message = {
        message: this.newMessage,
        date: new Date(),
        user: this.userName,
        type: 'sent',
      };
      this.messages.push(messageObj);
      this.newMessage = '';
      console.log(messageObj.date);
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } else {
      alert('You are disconnected. Please reconnect before sending a message.');
    }
  }

  connectToChat() {
    if (this.connected === false) {
      this.socket = io('https://api.skinopedia-lb.com', {
        secure: true,
      });
      this.socket.on('connect', () => {
        console.log('Connected to server');
      });
      this.JoinRoom();

      this.socket.on('Get-Message', (message: any, date: any, user: any) => {
        console.log(`received message: ${message}`);
        let messageObj: Message = {
          message: message,
          date: date,
          user: user,
          type: 'received',
        };
        this.messages.push(messageObj);
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      });
    }
    this.connected = true;
  }
}
