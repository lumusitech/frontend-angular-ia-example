import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxFile,
  TypingLoader,
  MyMessage,
  ChatMessage,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [TextMessageBoxFile, TypingLoader, MyMessage, ChatMessage],
  templateUrl: './audioToTextPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPage {
  messages = signal<Message[]>([
    { text: 'Hello world', isGpt: false },
    { text: 'Hello world!!!', isGpt: true },
  ]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }
}
