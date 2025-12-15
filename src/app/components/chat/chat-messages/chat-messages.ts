import { Component, inject, ElementRef, viewChild, effect } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { MessageBubbleComponent } from '../message-bubble/message-bubble';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [MessageBubbleComponent, TypingIndicatorComponent],
  templateUrl: './chat-messages.html',
  styleUrl: './chat-messages.scss',
})
export class ChatMessagesComponent {
  private readonly chatService = inject(ChatService);

  protected readonly messages = this.chatService.messages;
  protected readonly isTyping = this.chatService.isTyping;

  private readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  constructor() {
    // Auto-scroll when messages change or typing indicator appears
    effect(() => {
      this.messages();
      this.isTyping();
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messagesContainer()?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }
}
