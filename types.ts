import { ReactNode } from 'react';

export interface AppDefinition {
  id: string;
  name: string;
  icon: ReactNode;
  component: ReactNode;
  color: string;
}

export interface SystemState {
  isLocked: boolean;
  activeAppId: string | null;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  airplaneMode: boolean;
  isSiriOpen: boolean;
}

export enum GeminiModel {
  FLASH = 'gemini-2.5-flash',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}