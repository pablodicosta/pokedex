import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
  protected currentPage: number = 0;

  @Input() totalPages: number = 0;

  @Input() disabled: boolean = false;

  @Output() pageChanged = new EventEmitter<number>();

  protected prevClickHandler() {
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  protected nextClickHandler() {
    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }
}
