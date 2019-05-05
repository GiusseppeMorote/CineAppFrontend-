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
  MatGridListModule,
  MatChipsModule,
  MatTabsModule,
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
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
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
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }
  ]
})
export class MaterialModule {}
