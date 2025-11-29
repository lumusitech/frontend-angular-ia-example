import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxEvent,
  TextMessageBoxFile,
  TextMessageBoxSelect,
  TextMessageEvent,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/index';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageBoxFile,
    TextMessageBoxSelect,
  ],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {
  messages = signal<Message[]>([
    { text: 'Hello world', isGpt: false },
    { text: 'Hello world!!!', isGpt: true },
  ]);
  isLoading = signal(false);

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
