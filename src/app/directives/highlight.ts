import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight implements OnChanges {
  @Input('appHighlight') status: 'Pending' | 'Approved' | 'Rejected' = 'Pending';

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnChanges(): void {
    const color =
      this.status === 'Approved' ? 'green' :
        this.status === 'Rejected' ? 'crimson' : 'darkorange';
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.fontWeight = '600';
  }

}
