import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chatMessage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessage {
  text = input.required<string>();
}
