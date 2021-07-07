import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  successToastr(message: string): any {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  errorToastr(message: string): any {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar']
    });
  }
}
