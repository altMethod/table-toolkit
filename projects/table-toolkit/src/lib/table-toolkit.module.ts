import { NgModule } from '@angular/core';
import { TableBaseComponent } from './table-base.component';
import { TableBaseFilterToolbarComponent } from './filter-toolbar/filter-toolbar.component';
import {
  MatTableModule, MatPaginatorModule, MatInputModule,
  MatMenuModule, MatButtonModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  TextFieldComponent, DateComponent, DateRangeComponent,
  SelectComponent, NumberComponent
} from './fields';
import { EditorComponent } from './editor/editor.component';
import { TableBaseModalConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  declarations: [
    TableBaseComponent,
    TableBaseFilterToolbarComponent,
    TextFieldComponent,
    SelectComponent,
    DateComponent,
    DateRangeComponent,
    NumberComponent,
    EditorComponent,
    TableBaseModalConfirmComponent
  ],
  exports: [
    TableBaseComponent,
    TableBaseFilterToolbarComponent,
    TextFieldComponent,
    SelectComponent,
    DateComponent,
    DateRangeComponent,
    NumberComponent,
    EditorComponent,
    TableBaseModalConfirmComponent
  ],
  entryComponents: [TableBaseModalConfirmComponent]
})
export class TableToolkitModule { }
