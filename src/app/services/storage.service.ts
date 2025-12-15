import { Injectable } from '@angular/core';
import { ChatMessage, SerializedChatMessage } from '../models/chat.models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'buz-chat-history';
  private readonly MAX_MESSAGES = 100;

  saveMessages(messages: ChatMessage[]): void {
    try {
      const serialized = this.serialize(messages);
      localStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  loadMessages(): ChatMessage[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return [];
      }
      return this.deserialize(data);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      return [];
    }
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  }

  private serialize(messages: ChatMessage[]): string {
    const limitedMessages = messages.slice(-this.MAX_MESSAGES);
    const serialized: SerializedChatMessage[] = limitedMessages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
      timestamp: msg.timestamp.toISOString(),
    }));
    return JSON.stringify(serialized);
  }

  private deserialize(data: string): ChatMessage[] {
    const serialized: SerializedChatMessage[] = JSON.parse(data);
    return serialized.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
      timestamp: new Date(msg.timestamp),
    }));
  }
}
