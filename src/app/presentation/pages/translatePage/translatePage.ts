import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageBoxEvent,
  TextMessageBoxSelect,
} from '@components/index';

@Component({
  selector: 'app-translate-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelect],
  templateUrl: './translatePage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'español', text: 'Español' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `Traduce a ${selectedOption}: ${prompt}`;
    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text: message, isGpt: false }]);

    this.openAiService.translateText(prompt, selectedOption).subscribe({
      next: ({ message }) => {
        this.isLoading.set(false);
        this.messages.update((messages) => [...messages, { text: message, isGpt: true }]);
      },
    });
  }
}
