import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessage, MyMessage, TextMessageBox, TypingLoader } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {
  handleMessage(prompt: string) {
    console.log(prompt);
  }
}
