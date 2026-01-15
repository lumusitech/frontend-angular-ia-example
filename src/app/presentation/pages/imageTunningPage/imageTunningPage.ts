import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AiMessageEditableImage,
  ChatMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  imports: [ChatMessage, MyMessage, TextMessageBox, TypingLoader, AiMessageEditableImage],
  templateUrl: './imageTunningPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPage {
  messages = signal<Message[]>([
    // {
    //   isGpt: true,
    //   text: 'test image to avoid generate new image and spend openai credits',
    //   imageInfo: {
    //     url: 'http://localhost:3000/ai/image-generation/1768487049108.png',
    //     alt: 'Image 1',
    //   },
    // },
  ]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);
  originalImage = signal('');
  maskImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAiService
      .imageGeneration(prompt, this.originalImage(), this.maskImage())
      .subscribe((resp) => {
        if (!resp) return;

        this.messages.update((prev) => [...prev, { text: resp.alt, isGpt: true, imageInfo: resp }]);

        this.isLoading.set(false);
      });
  }

  handleSelectedImage(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);

    //TODO: Mask the original image

    console.log({ newImage, originalImage });
  }

  generateVariation() {
    if (!this.originalImage()) return;

    this.isLoading.set(true);

    this.openAiService.imageVariation(this.originalImage()).subscribe((resp) => {
      this.isLoading.set(false);

      if (!resp) return;

      // show generated Image (Variation)
      this.messages.update((prev) => [
        ...prev,
        {
          text: resp.alt,
          isGpt: true,
          imageInfo: resp,
        },
      ]);
    });
  }
}
