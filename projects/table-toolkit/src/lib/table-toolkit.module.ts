import { NgModule } from '@angular/core';
import { FilterToolbarComponent } from './filter-toolbar/filter-toolbar.component';
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
import { ModalConfirmComponent } from './confirm/confirm.component';
import { TableComponent } from './table/table-base.component';
import { TableCellComponent } from './table/table-base-cell/table-base-cell.component';
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
    TableComponent,
    FilterToolbarComponent,
    EditorComponent,
    ModalConfirmComponent,
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
    TableCellComponent
  ],
  exports: [
    TableComponent,
    FilterToolbarComponent,
    ModalConfirmComponent,

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
  entryComponents: [ModalConfirmComponent]
})
export class TableToolkitModule { }
