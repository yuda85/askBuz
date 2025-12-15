import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatService } from '../../../services/chat.service';
import { ChatHeaderComponent } from '../chat-header/chat-header';
import { ChatMessagesComponent } from '../chat-messages/chat-messages';
import { ChatInputComponent } from '../chat-input/chat-input';
import { ChatToggleComponent } from '../chat-toggle/chat-toggle';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    ChatToggleComponent,
  ],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.scss',
  animations: [
    trigger('chatAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8) translateY(20px)' })),
      ]),
    ]),
  ],
})
export class ChatContainerComponent {
  private readonly chatService = inject(ChatService);

  protected readonly isOpen = this.chatService.isOpen;

  toggleChat(): void {
    this.chatService.toggleChat();
  }

  closeChat(): void {
    this.chatService.closeChat();
  }

  onMessageSent(text: string): void {
    this.chatService.sendMessage(text);
  }
}
