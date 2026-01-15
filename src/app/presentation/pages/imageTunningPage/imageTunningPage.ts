import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TextMessageBox, TypingLoader } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  imports: [ChatMessage, MyMessage, TextMessageBox, TypingLoader],
  templateUrl: './imageTunningPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPage {
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
