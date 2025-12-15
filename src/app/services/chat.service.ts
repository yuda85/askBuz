import { Injectable, signal, computed, inject } from '@angular/core';
import { ChatMessage, MessageSender, Answer } from '../models/chat.models';
import { StorageService } from './storage.service';
import { AnswersService } from './answers.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly storageService = inject(StorageService);
  private readonly answersService = inject(AnswersService);

  // State signals
  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _isTyping = signal<boolean>(false);
  private readonly _isOpen = signal<boolean>(false);

  // Public readonly signals
  readonly messages = this._messages.asReadonly();
  readonly isTyping = this._isTyping.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();

  // Computed values
  readonly hasMessages = computed(() => this._messages().length > 0);
  readonly messageCount = computed(() => this._messages().length);

  constructor() {
    this.loadFromStorage();
  }

  toggleChat(): void {
    this._isOpen.update((open) => !open);
  }

  openChat(): void {
    this._isOpen.set(true);
  }

  closeChat(): void {
    this._isOpen.set(false);
  }

  async sendMessage(text: string): Promise<void> {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    // Add user message
    this.addMessage(trimmedText, 'user');

    // Process and respond
    await this.processUserMessage(trimmedText);
  }

  clearHistory(): void {
    this._messages.set([]);
    this.storageService.clearHistory();
  }

  private async processUserMessage(text: string): Promise<void> {
    if (this.isQuestion(text)) {
      // Get random answer
      const answer = this.answersService.getRandomAnswer();
      await this.addBuzResponse(answer);
    } else {
      // Not a question - respond with fallback
      const fallback = this.answersService.getFallbackNotQuestion();
      await this.showTypingThenMessage(fallback);
    }
  }

  private isQuestion(text: string): boolean {
    return text.trim().endsWith('?');
  }

  private addMessage(text: string, sender: MessageSender): void {
    const message: ChatMessage = {
      id: this.generateId(),
      text,
      sender,
      timestamp: new Date(),
    };

    this._messages.update((messages) => [...messages, message]);
    this.saveToStorage();
  }

  private async addBuzResponse(answer: Answer): Promise<void> {
    const typingDelay = this.answersService.getTypingDelay();
    const messageDelay = this.answersService.getMessageDelay();

    for (let i = 0; i < answer.messages.length; i++) {
      // Show typing indicator
      this._isTyping.set(true);
      await this.sleep(typingDelay);

      // Add message
      this._isTyping.set(false);
      this.addMessage(answer.messages[i], 'buz');

      // Wait before next message (except for last)
      if (i < answer.messages.length - 1) {
        await this.sleep(messageDelay);
      }
    }
  }

  private async showTypingThenMessage(text: string): Promise<void> {
    const typingDelay = this.answersService.getTypingDelay();

    this._isTyping.set(true);
    await this.sleep(typingDelay);
    this._isTyping.set(false);

    this.addMessage(text, 'buz');
  }

  private loadFromStorage(): void {
    const messages = this.storageService.loadMessages();
    this._messages.set(messages);
  }

  private saveToStorage(): void {
    this.storageService.saveMessages(this._messages());
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
