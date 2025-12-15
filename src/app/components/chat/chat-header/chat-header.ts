import { Component, output } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeaderComponent {
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
