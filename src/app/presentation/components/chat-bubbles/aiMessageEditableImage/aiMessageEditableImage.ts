import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-ai-message-editable-image',
  imports: [],
  templateUrl: './aiMessageEditableImage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMessageEditableImage implements AfterViewInit {
  text = input.required<string>();
  imageInfo = input.required<{ url: string; alt: string }>();
  onSelectedImage = output<string>();
  canvasElement = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  originalImage = signal<HTMLImageElement | null>(null);
  isDrawing = signal<boolean>(false);
  coords = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  ngAfterViewInit(): void {
    if (!this.canvasElement()?.nativeElement) return;

    console.log(this.canvasElement().nativeElement);

    const canvas = this.canvasElement().nativeElement;
    const ctx = canvas.getContext('2d')!;

    const img = new Image();
    img.crossOrigin = 'anonymous'; //? Allow loading images from other domains
    img.src = this.imageInfo().url;

    //? backup original image
    this.originalImage.set(img);

    img.onload = () => {
      //? 1. use the image to draw on the canvas
      //? 2. begins draw the image on the canvas at point (0, 0)
      //? 3. the image will be drawn on the canvas size (canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }

  handleClick() {
    // this.onSelectedImage.emit(this.imageInfo().url);
  }

  onMouseDown(event: MouseEvent) {
    if (!this.canvasElement()?.nativeElement) return;

    this.isDrawing.set(true);

    const startX = event.clientX - this.canvasElement().nativeElement.getBoundingClientRect().left;
    const startY = event.clientY - this.canvasElement().nativeElement.getBoundingClientRect().top;
    this.coords.set({ x: startX, y: startY });

    console.log(this.coords());
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing()) return;

    if (!this.canvasElement()?.nativeElement) return;

    const canvasRef = this.canvasElement().nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    // Calc rectangle size
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    // get canvas context
    const ctx = canvasRef.getContext('2d')!;
    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    // clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw image
    ctx.drawImage(this.originalImage()!, 0, 0, canvasWidth, canvasHeight);

    // delete rectangle that we draw on image
    ctx.clearRect(this.coords().x, this.coords().y, width, height);
  }

  onMouseUp() {
    this.isDrawing.set(false);

    const canvasRef = this.canvasElement().nativeElement;
    const url = canvasRef.toDataURL('image/png');

    this.onSelectedImage.emit(url);
  }
}
