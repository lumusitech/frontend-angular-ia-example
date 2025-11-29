import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxEvent,
  ChatMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxFile,
  TextMessageBoxSelect,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  imports: [
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageBoxFile,
    TextMessageBoxSelect,
  ],
  templateUrl: './chatTemplate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplate {
  messages = signal<Message[]>([
    { text: 'Hello world', isGpt: false },
    { text: 'Hello world!!!', isGpt: true },
  ]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log(prompt);
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    console.log({ prompt, selectedOption });
  }
}
