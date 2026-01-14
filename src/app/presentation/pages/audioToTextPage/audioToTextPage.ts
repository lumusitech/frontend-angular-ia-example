import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxFile,
  TypingLoader,
  MyMessage,
  ChatMessage,
} from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [TextMessageBoxFile, TypingLoader, MyMessage, ChatMessage],
  templateUrl: './audioToTextPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPage {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  openAiService = inject(OpenAiService);

  handleMessageWithFile({ file, prompt }: TextMessageEvent) {
    console.log({ fileName: file.name });

    const text = prompt || file.name || 'transcribe audio';
    this.isLoading.set(true);

    this.messages.update((messages) => [...messages, { text, isGpt: false }]);

    this.openAiService.audioToText(file, text).subscribe({
      next: (resp) => this.handleResponse(resp),
    });
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);

    if (!resp) {
      return;
    }

    const text = `
    ## Audio Transcription
    __Duration:__ ${Math.round(resp.duration)} seconds
    ## Text:
    ${resp.text}
    `;

    this.messages.update((messages) => [...messages, { text, isGpt: true }]);

    //? Details about each text segment transcription with its start and end time.
    for (const segment of resp.segments) {
      const segmentText = `
        __From: ${Math.round(segment.start)} seconds to: ${Math.round(segment.end)} seconds.__
        ${segment.text}
      `;

      this.messages.update((messages) => [...messages, { text: segmentText, isGpt: true }]);
    }
  }
}
