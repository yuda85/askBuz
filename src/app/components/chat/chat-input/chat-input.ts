import { Component, output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss',
})
export class ChatInputComponent {
  private readonly chatService = inject(ChatService);

  protected readonly messageText = signal('');
  protected readonly isTyping = this.chatService.isTyping;

  messageSent = output<string>();

  onSubmit(): void {
    const text = this.messageText().trim();
    if (text && !this.isTyping()) {
      this.messageSent.emit(text);
      this.messageText.set('');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
