import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  prompt?: string | null;
  file: File;
}

@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './textMessageBoxFile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFile {
  placeholder = input<string>('');
  onMessage = output<TextMessageEvent>();

  fb = inject(FormBuilder);
  form = this.fb.group({
    prompt: [''],
    file: [null, Validators.required],
  });
  file = signal<File | undefined>;

  handledSelectedFile(event: any) {
    const file = event.target.files[0];
    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;

    this.onMessage.emit({ prompt, file: file! });

    this.form.reset();
  }
}
