import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessage } from '../../components/chat-bubbles/chatMessage/chatMessage';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {}
