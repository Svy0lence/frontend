 import { Component, Inject } from '@angular/core';
 //import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.scss']
})
export class DialogCloseComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogCloseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}