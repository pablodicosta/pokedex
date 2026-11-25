import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '@components/list-item/list-item.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { Observable } from 'rxjs';

export interface PaginatedListItem {
  name: string;
  imageUrl: string;
  id?: number;
  types?: string[];
}

@Component({
  selector: 'app-paginated-list',
  standalone: true,
  imports: [ListItemComponent, PaginatorComponent, CommonModule],
  templateUrl: './paginated-list.component.html'
})
export class PaginatedListComponent {
  protected currentPage = 0;
  
  @Input() pageSize: number = 0;

  @Input() items: Observable<PaginatedListItem>[] | null = [];

  @Input() totalPages: number = 0;

  @Input() hidePaginator: boolean = false;

  @Input() loadError = false;
  
  @Output() lastPage = new EventEmitter();

  @Output() itemClick = new EventEmitter<string>();

  protected isCurrentPageEmpty() {
    return !this.items?.[this.currentPage * this.pageSize];
  }

  protected getPageItems(): Observable<PaginatedListItem>[] {
    if (this.hidePaginator) return this.items ?? [];
    const start = this.currentPage * this.pageSize;
    return this.items?.slice(start, start + this.pageSize) ?? [];
  }

  protected pageChangedHandler(currentPage: number) {
    this.currentPage = currentPage;
    this.checkLastPage();
  }

  private checkLastPage() {
    if (this.isCurrentPageEmpty()) {
      this.lastPage.emit();      
    }
  }
}
