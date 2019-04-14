import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,

  MatSnackBarModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MAT_DATE_LOCALE,

  MatStepperModule,
  MatCheckboxModule,
  MatListModule,
  MatChipsModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,

    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,

    MatStepperModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,

    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,

    MatStepperModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }
  ]
})
export class MaterialModule {}
