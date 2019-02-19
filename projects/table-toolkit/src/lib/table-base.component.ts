import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { TableBaseConfig, SortModel, TableBaseFilter } from './table.model';

@Component({
  selector: 'bp-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss']
})
export class TableBaseComponent implements OnInit {

  constructor() { }

  @Input() data: Array<any>;
  @Input() filter: TableBaseFilter;
  @Input() config: TableBaseConfig;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() sortChanged: EventEmitter<SortModel> = new EventEmitter();
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter();
  @Output() dblClick: EventEmitter<any> = new EventEmitter();

  columns: Array<string> = [];
  dataSource: MatTableDataSource<any>;
  pageSizeOptions = [5, 10, 25, 100];

  ngOnInit() {
    this.initializeColumns();
    this.dataSource = new MatTableDataSource(this.data);
  }

  changePage(event: PageEvent) {
    this.pageChanged.emit(event);
  }

  changeSort(event: Sort) {
    this.sortChanged.emit({
      direction: event.direction,
      field: event.active
    });
  }

  private initializeColumns() {
    if (this.config.fields) {
      this.columns = this.config.fields.map(f => f.name);
    }

    if (this.config.showActionsColumn) {
      this.columns.push('actions');
    }
  }
}
