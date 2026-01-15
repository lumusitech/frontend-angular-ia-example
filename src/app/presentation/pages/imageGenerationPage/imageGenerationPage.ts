import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '@components/index';

@Component({
  selector: 'app-image-generation-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './imageGenerationPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAiService.imageGeneration(prompt).subscribe((resp) => {
      if (!resp) return;

      this.messages.update((prev) => [...prev, { text: resp.alt, isGpt: true, imageInfo: resp }]);

      this.isLoading.set(false);
    });
  }
}
