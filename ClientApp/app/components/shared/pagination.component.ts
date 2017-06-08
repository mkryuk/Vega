import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') public totalItems;
  @Input('page-size') public pageSize = 10;
  @Output('page-changed') public pageChanged = new EventEmitter();
  public pages: any[];
  public currentPage = 1;

  public ngOnChanges() {
    this.currentPage = 1;

    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }
  }

  public changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  public previous() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  public next() {
    if (this.currentPage === this.pages.length) {
      return;
    }

    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }
}
