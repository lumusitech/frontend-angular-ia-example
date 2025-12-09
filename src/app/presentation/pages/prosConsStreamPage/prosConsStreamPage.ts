import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '@components/index';
import { Message } from '@interfaces/message.interface';

import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './prosConsStreamPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPage {
  abortSignal = signal(new AbortController());
  isLoading = signal(false);
  messages = signal<Message[]>([]);
  openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    //? kill previous stream when a new request of comparison is started
    this.abortSignal().abort();

    //? init new abort controller
    this.abortSignal.set(new AbortController());

    this.messages.update((prev) => [
      ...prev,
      { text: prompt, isGpt: false },
      { text: '...', isGpt: true },
    ]);

    this.isLoading.set(true);
    const stream = this.openAiService.checkProsConsStream(prompt, this.abortSignal().signal);
    this.isLoading.set(false);

    for await (const chunk of stream) {
      this.handleStreamResponse(chunk);
    }
  }

  handleStreamResponse(chunk: string) {
    //? First, remove the '...' message and then, replace partial IA message with the new chunk
    this.messages().pop();

    this.messages.set([...this.messages(), { text: chunk, isGpt: true }]);
  }
}
