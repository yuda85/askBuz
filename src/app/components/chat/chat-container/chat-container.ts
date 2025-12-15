import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatHeaderComponent } from '../chat-header/chat-header';
import { ChatMessagesComponent } from '../chat-messages/chat-messages';
import { ChatInputComponent } from '../chat-input/chat-input';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.scss',
})
export class ChatContainerComponent {
  private readonly chatService = inject(ChatService);

  onMessageSent(text: string): void {
    this.chatService.sendMessage(text);
  }
}
