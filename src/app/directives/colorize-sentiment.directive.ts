import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[colorizeSentiment]',
})
export class ColorizeSentimentDirective {
  currentStyle = {
    borderType: 'border-',
    borderClass: 'border-',
  };
  @Input() borderType: 'full' | 'left' = 'full';
  @Input() set colorizeSentiment(classification: string | undefined) {
    // if (!classification) {
    //   return;
    // }

    if (this.borderType === 'left') {
      this.currentStyle.borderType = 'border-l-';
      this.el.nativeElement.classList.add(`${this.currentStyle.borderType}2`);
    } else {
      this.el.nativeElement.classList.add(`${this.currentStyle.borderType}2`);
    }

    if (!classification) {
      this.setBorderClass('neutral-700');
      this.addBorderClass();
    }
    if (classification === 'POSITIVE') {
      this.removeBorderClass();
      this.setBorderClass('green-500');
      this.addBorderClass();
    }
    if (classification === 'NEGATIVE') {
      this.removeBorderClass();
      this.setBorderClass('red-500');
      this.addBorderClass();
    }
    if (classification === 'NEUTRAL') {
      this.removeBorderClass();
      this.setBorderClass('orange-500');
      this.addBorderClass();
    }
  }

  constructor(private el: ElementRef) {}

  setBorderClass(color: string) {
    this.currentStyle.borderClass = `${this.currentStyle.borderType}${color}`;
  }

  removeBorderClass() {
    return this.el.nativeElement.classList.remove(
      this.currentStyle.borderClass
    );
  }

  addBorderClass() {
    return this.el.nativeElement.classList.add(this.currentStyle.borderClass);
  }
}
