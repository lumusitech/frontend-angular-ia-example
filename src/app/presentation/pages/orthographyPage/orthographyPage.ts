import { ChangeDetectionStrategy, Component } from '@angular/core';
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
