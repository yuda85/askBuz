import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeaderComponent {
  private readonly chatService = inject(ChatService);

  onClearChat(): void {
    this.chatService.clearHistory();
  }
}
