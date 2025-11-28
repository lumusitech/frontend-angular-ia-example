import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessage, MyMessage, TypingLoader } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage, MyMessage, TypingLoader],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {}
