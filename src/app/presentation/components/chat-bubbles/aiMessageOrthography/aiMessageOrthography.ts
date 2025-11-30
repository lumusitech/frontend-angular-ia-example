import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ia-message-orthography',
  imports: [],
  templateUrl: './aiMessageOrthography.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMessageOrthography {
  userScore = input.required<number>();
  text = input.required<string>();
  errors = input<string[]>([]);
}
