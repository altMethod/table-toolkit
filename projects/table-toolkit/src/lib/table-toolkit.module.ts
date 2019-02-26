import { NgModule } from '@angular/core';
import { TableBaseFilterToolbarComponent } from './filter-toolbar/filter-toolbar.component';
import {
  MatTableModule, MatPaginatorModule, MatInputModule,
  MatMenuModule, MatButtonModule, MatIconModule, MatSelectModule,
  MatDatepickerModule, MatDialogModule, MatAutocompleteModule,
  MatCheckboxModule, MatRadioModule, MatChipsModule,
  MatTooltipModule, MatNativeDateModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AutocompleteComponent,
  CheckboxComponent,
  DateComponent,
  DateRangeComponent,
  ContainerComponent,
  DynamicComponent,
  MultipleComponent,
  NumberComponent,
  SelectComponent,
  TextFieldComponent,
  RadioGroupComponent
} from './fields';
import { EditorComponent } from './editor/editor.component';
import { TableBaseModalConfirmComponent } from './confirm/confirm.component';
import { TableBaseComponent } from './table/table-base.component';
import { TableBaseCellComponent } from './table/table-base-cell/table-base-cell.component';
import { NotAvailablePipe } from './pipes';

@NgModule({
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatRadioModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    TableBaseComponent,
    TableBaseFilterToolbarComponent,
    EditorComponent,
    TableBaseModalConfirmComponent,
    NotAvailablePipe,

    // fields
    AutocompleteComponent,
    CheckboxComponent,
    DateComponent,
    DateRangeComponent,
    ContainerComponent,
    DynamicComponent,
    MultipleComponent,
    NumberComponent,
    SelectComponent,
    TextFieldComponent,
    RadioGroupComponent,
    TableBaseCellComponent
  ],
  exports: [
    TableBaseComponent,
    TableBaseFilterToolbarComponent,
    TableBaseModalConfirmComponent,

    // fields
    AutocompleteComponent,
    CheckboxComponent,
    EditorComponent,
    DateComponent,
    DateRangeComponent,
    ContainerComponent,
    DynamicComponent,
    MultipleComponent,
    NumberComponent,
    SelectComponent,
    TextFieldComponent,
    RadioGroupComponent
  ],
  entryComponents: [TableBaseModalConfirmComponent]
})
export class TableBaseModule { }
