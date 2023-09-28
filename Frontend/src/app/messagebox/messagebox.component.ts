import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})


export class MessageboxComponent implements OnInit {

  flag:boolean;
  message:any;
  
  
    ngOnInit() {
  
    }
  
    constructor(public dialogRef: MatDialogRef<MessageboxComponent>) { }
  
    confirmSelection() {
  
  
      this.dialogRef.close(this.flag);
    }
  
  
  
  }
