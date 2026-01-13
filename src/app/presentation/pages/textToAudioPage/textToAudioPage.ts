import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TextMessageBoxEvent,
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
} from '@components/index';
import type { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelect],
  templateUrl: './textToAudioPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);
  voices = signal([
    { id: 'alloy', text: 'alloy' },
    { id: 'ash', text: 'ash' },
    { id: 'ballad', text: 'ballad' },
    { id: 'coral', text: 'coral' },
    { id: 'echo', text: 'echo' },
    { id: 'fable', text: 'fable' },
    { id: 'onyx', text: 'onyx' },
    { id: 'nova', text: 'nova' },
    { id: 'sage', text: 'sage' },
    { id: 'shimmer', text: 'shimmer' },
    { id: 'verse', text: 'verse' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;
    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);

    this.isLoading.set(true);

    this.openAiService.textToAudio(prompt, selectedOption).subscribe({
      next: ({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [...prev, { text: message, isGpt: true, audioUrl }]);
      },
      error: (error) => {
        console.log(error);
        this.messages.update((prev) => [...prev, { text: error.message, isGpt: true }]);
        this.isLoading.set(false);
      },
    });
  }
}
