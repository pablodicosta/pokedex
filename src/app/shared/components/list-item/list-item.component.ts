import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styles: `
    .content img {
      image-rendering: pixelated;
    }
  `
})
export class ListItemComponent {
  @Input({required: true}) title? = '';

  @Input({required: true}) imgSrc? = '';

  @Output() itemClick = new EventEmitter<string>();
}
