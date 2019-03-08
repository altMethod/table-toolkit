import { Component } from '@angular/core';
import { config, data, User } from './table.config';
import { TableBaseConfig, TableBaseResponse, ModalConfirmComponent } from 'projects/table-toolkit/src/';
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

  delete(user: User) {
    const modalData = {
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      yesLabel: 'Of course',
      noLabel: 'Nah'
    };
    this.dialog.open(ModalConfirmComponent, {
      data: modalData,
      width: '320px',
      height: '180px'
    }).afterClosed().subscribe((canClose: boolean) => {
      if (canClose) {
        const index = this.data.items.findIndex((u: User) => u.id === user.id);
        this.data.items.splice(index, 1);
        this.data = {
          ...this.data
        };
      }
    });
  }

  edit(user: User) {
    this.dialog.open(FormComponent, {
      width: '520px',
      height: '720px',
      data: {
        model:
        {
          ...user,
          departments: [...user.departments],
          history: [...user.history]
        },
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

  create() {
    this.dialog.open(FormComponent, {
      width: '520px',
      height: '720px',
      data: {
        model: {},
        config: this.config
      }
    }).afterClosed().subscribe((user: User) => {
      if (user) {
        user.id = this.data.items.length;
        this.data.items = [...this.data.items, user];
        this.data = { ...this.data };
      }
      console.log(this.data.items);
    });
  }
}
