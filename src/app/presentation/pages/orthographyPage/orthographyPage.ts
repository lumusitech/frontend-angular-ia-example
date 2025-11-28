import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessage, MyMessage } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage, MyMessage],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {}
