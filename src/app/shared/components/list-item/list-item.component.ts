import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  @Input({required: true}) title = '';

  @Input({required: true}) imgSrc? = '';

  @Input() entryId?: number;

  @Input() types?: string[];

  protected imageFailed = false;

  @Output() itemClick = new EventEmitter<string>();
}
