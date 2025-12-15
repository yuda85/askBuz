import { Injectable } from '@angular/core';
import { Answer, AnswersData } from '../models/chat.models';
import answersData from '../data/answers.json';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private readonly data: AnswersData = answersData as AnswersData;

  getRandomAnswer(): Answer {
    const index = this.getRandomIndex(this.data.answers.length);
    return this.data.answers[index];
  }

  getFallbackNotQuestion(): string {
    return this.data.fallbackNotQuestion;
  }

  getFallbackUnmatched(): string {
    return this.data.fallbackUnmatched;
  }

  getTypingDelay(): number {
    return this.data.typingDelayMs;
  }

  getMessageDelay(): number {
    return this.data.messageDelayMs;
  }

  private getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
