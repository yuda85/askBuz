import { Component, input } from '@angular/core';
import { ChatMessage } from '../../../models/chat.models';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.scss',
})
export class MessageBubbleComponent {
  message = input.required<ChatMessage>();
}
