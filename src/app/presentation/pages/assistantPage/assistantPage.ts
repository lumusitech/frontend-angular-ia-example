import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '@components/index';

@Component({
  selector: 'app-assistant-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './assistantPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);
  conversationId = signal('');

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.conversationId.set(localStorage.getItem('conversationId') || '');

    //? User message
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    //? GPT message from our backend
    this.openAiService.createConversation(prompt, this.conversationId()).subscribe((resp) => {
      this.isLoading.set(false);

      //? For new conversation
      if (!this.conversationId()) {
        this.conversationId.set(resp!.conversationId); //? get the new conversation id from backend
        localStorage.setItem('conversationId', resp!.conversationId); //? save the new conversation id
      }

      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp!.content,
        },
      ]);
    });
  }
}
