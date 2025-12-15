import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-chat-toggle',
  standalone: true,
  templateUrl: './chat-toggle.html',
  styleUrl: './chat-toggle.scss',
})
export class ChatToggleComponent {
  isOpen = input<boolean>(false);
  toggle = output<void>();

  onClick(): void {
    this.toggle.emit();
  }
}
