import { Component } from '@angular/core';
import { config, data, User } from './table.config';
import { TableBaseConfig, TableBaseResponse } from 'table-toolkit';
import { MatDialog } from '@angular/material';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog) {
    this.config = { ...config };
    this.data = {
      items: data,
      count: 2,
      page: 0,
      pageSize: 20
    };
  }

  config: TableBaseConfig;
  data: TableBaseResponse;

  edit(user: User) {
    this.dialog.open(FormComponent, {
      width: '520px',
      height: '620px',
      data: {
        model: user,
        config: this.config
      }
    }).afterClosed().subscribe((updated: User) => {
      if (updated) {
        const index = this.data.items.findIndex(u => u.id === updated.id);
        if (index > -1) {
          this.data.items.splice(index, 1, updated);
          this.data = Object.assign({}, this.data);
        }
      }
    });
  }
}
