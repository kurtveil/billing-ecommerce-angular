import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  message = '';  
  public _snackBar = inject(MatSnackBar);

  openSnackBar(
    message:string, 
    action: string, 
    horizontalPosition: any, 
    verticalPosition: any, 
    panelClass: any) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: panelClass
    });

  }
}
