import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[colorizeSentiment]',
})
export class ColorizeSentimentDirective {
  borderClass = '';
  currentClass = '';

  @Input() borderType: 'border-full' | 'border-left' = 'border-full';
  @Input() set colorizeSentiment(classification: string | undefined) {
    switch (classification) {
      case 'POSITIVE':
        this.changeBorder('green');
        break;
      case 'NEGATIVE':
        this.changeBorder('red');
        break;
      case 'NEUTRAL':
        this.changeBorder('amber');
        break;
      default:
        this.changeBorder('neutral');
    }
  }

  constructor(private el: ElementRef) {}

  changeBorder(color: string) {
    this.removeCurrentClass();
    this.setCurrentClass(`${color}-`);
    this.addBorderClass();
  }

  setCurrentClass(color: string) {
    this.currentClass = `${color}${this.borderType}`;
  }

  removeCurrentClass() {
    if (!this.currentClass) {
      return;
    }
    this.el.nativeElement.classList.remove(this.currentClass);
  }

  addBorderClass() {
    return this.el.nativeElement.classList.add(this.currentClass);
  }
}
