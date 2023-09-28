import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

flag:boolean;
message:any;

  ngOnInit() {

  }

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>) { }

  confirmSelection() {


    this.dialogRef.close(this.flag);
  }

}
