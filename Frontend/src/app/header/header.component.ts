import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,NavigationEnd } from "@angular/router";
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessService } from '../business.service';
import { AdLoginDetails } from './AdLoginDetails';

import * as $ from 'jquery';






@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})



export class HeaderComponent implements OnInit {


 
   constructor(public _modalService: NgbModal) { 
    
   }
 
   withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
   (click)="modal.close('Ok click')">Ok</button>`;

   open(name: string) {
    this._modalService.open(MODALS[name]);
  }





   ngOnInit() {
    
  }



}








@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Admin Login</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <form [formGroup]="ngForm">
  <div class="container">
    <div class="form-group">
        <label><b>Username</b></label>
        <input type="text" ngbAutofocus class="form-control" placeholder="Enter Username" name="username" formControlName="username" #username>
    </div>
    <div class="form-group">
        <label><b>Password</b></label>
        <input type="password" class="form-control" placeholder="Enter Password" name="password" formControlName="password" #password>
    </div>
    <div class="text-center" style="height:32px;">
        <label *ngIf="checkmsg"><b>{{msg}}</b></label>
    </div>
<div class="form-group text-center">
   <button type="button" class="btn btn-width btn-danger mr-2" (click)="login(username.value,password.value)">Register</button>
    <button type="button"  class="btn btn-width btn-primary ml-2" (click)="validateUser(username.value,password.value)">Login</button>
 
</div>

</div>
</form>
  </div>
  <!--<div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>-->
  `
})



export class NgbdModalConfirmAutofocus {

  ngForm:FormGroup;
  login_details:AdLoginDetails[];
  @Input()
  userdata: any;
  checkmsg = true;
  msg = null;


  constructor(public modal: NgbActiveModal,public _modalService: NgbModal,private formBuilder: FormBuilder,private loginservice: BusinessService,private router: Router) {

    this.ngForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
  (click)="modal.close('Ok click')">Ok</button>`;





  // to add data to database
  login(username,password){
    this.loginservice.addLoginData(username,password);
  }

  validateUser(username,password){
    this.loginservice.getLogindetails()
    .subscribe((data: AdLoginDetails[]) => {
      this.login_details = data;
      this.userdata=data;
    console.log(JSON.stringify(this.userdata));

    



    for(let i=0;i<this.userdata.length;i++){


      if(this.userdata[i].user_name == username && this.userdata[i].user_password == password){
        // Save data to sessionStorage
        console.log("match")
       
       this.router.navigate(['create'])
       this.msg = "Login Successfull";
       this.modal.close('Ok click')
       sessionStorage.setItem("username",username);
        return;
      }
      else{


      }
      console.log("no match")
      this.checkmsg = true;
      this.msg = "Invalid Credential";
    }
  
    });

    
  }

  
}


const MODALS = {
  autofocus: NgbdModalConfirmAutofocus
}; 




  


  