import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TextMessageBox, TypingLoader } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './prosConsPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    //? User message
    this.messages.update((prev) => [
      ...prev,
      { text: prompt, isGpt: false, role: 'user', content: '' },
    ]);

    //? GPT message from our backend
    this.openAiService.checkProsCons(prompt).subscribe((resp) => {
      this.isLoading.set(false);

      this.messages.update((prev) => [...prev, { text: resp.content, isGpt: true }]);
    });
  }
}
