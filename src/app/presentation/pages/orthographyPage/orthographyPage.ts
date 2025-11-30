import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  AiMessageOrthography,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox, AiMessageOrthography],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    //? User message
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    //? GPT message from our backend
    this.openAiService.checkOrthography(prompt).subscribe((resp) => {
      this.isLoading.set(false);

      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp,
        },
      ]);
    });
  }
}
