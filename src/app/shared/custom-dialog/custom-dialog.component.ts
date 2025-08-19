import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss'
})
export class CustomDialogComponent {
  data = inject(MAT_DIALOG_DATA);

  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>) {}

  onCloseDialog(isDialog: boolean){
    this.dialogRef.close(isDialog);
  }
}
