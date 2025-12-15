/**
 * Represents the sender of a message
 */
export type MessageSender = 'user' | 'buz';

/**
 * Individual chat message
 */
export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
}

/**
 * Serialized version for localStorage (Date becomes string)
 */
export interface SerializedChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
}

/**
 * Single answer (one message)
 */
export interface SingleAnswer {
  type: 'single';
  messages: [string];
}

/**
 * Multi-message answer (2-4 messages delivered sequentially)
 */
export interface MultiAnswer {
  type: 'multi';
  messages: string[];
  delayBetweenMs?: number;
}

/**
 * Union type for any answer
 */
export type Answer = SingleAnswer | MultiAnswer;

/**
 * Root structure for answers.json
 */
export interface AnswersData {
  answers: Answer[];
  fallbackNotQuestion: string;
  fallbackUnmatched: string;
  typingDelayMs: number;
  messageDelayMs: number;
}
