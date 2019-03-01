import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { TableBaseConfig, SortModel, TableBaseResponse } from '../table.model';
import { FieldInfo, ColumnType } from '../field-info';

@Component({
  selector: 'bp-table',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() data: TableBaseResponse;
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
    this.dataSource = new MatTableDataSource(this.data.items);
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    if (data) {
      const source = (data.currentValue as TableBaseResponse).items;
      this.dataSource = new MatTableDataSource(source);
    }
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
      this.columns = this.config.fields.reduce((acc: Array<string>, current: FieldInfo) => {
        if (current.hideInTable) {
          return acc;
        }

        if (current.type !== ColumnType.container) {
          return [...acc, current.name];
        } else {
          return [...acc, ...current.innerFields
            .reduce((innerAcc: Array<string>, innerCurrent: FieldInfo) =>
              innerCurrent.hideInTable ? innerAcc : [...innerAcc, innerCurrent.name], [])];
        }
      }, []);
    }

    if (this.config.showActionsColumn) {
      this.columns.push('actions');
    }
  }
}
