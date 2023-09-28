import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { MessageboxComponent } from './messagebox/messagebox.component';
@Injectable({
providedIn: 'root'
})
export class BusinessService {
//Local
//uri = 'http://localhost:8080/KC';

//Build
uri = location.origin+'/KC';

constructor(private http: HttpClient,private msgdialog:MatDialog,private router:Router,private route: ActivatedRoute) { }

addLoginData(username,password){
    const obj = {
      user_name: username,
      user_password: password
    };
    this.http.post(`${this.uri}/login`, obj)
        .subscribe(res => console.log('Done'));
  }

getLogindetails() {
    return this
           .http
           .get(`${this.uri}/logindata`);
}

addBusiness(item_type,KC_Code,product, fabric, work_type, price, fileupload) {
const obj = {
item_type:item_type,
KC_Code:KC_Code,  
product: product,
fabric: fabric,
work_type: work_type,
price: price,
fileupload : fileupload
};

this.http.post(`${this.uri}/add`, obj)
.subscribe(res =>    {
  console.log(JSON.stringify(res))
  this.confirmationmodel(res)
},error =>{
  this.confirmationmodel(error)
  console.log(JSON.stringify(error))
})
}

confirmationmodel(data)
{
  console.log("resp---------"+JSON.stringify(data))
  let dialog= this.msgdialog.open(MessageboxComponent,{
    height: '160px',
    width: '300px',
  disableClose:false
  
  })
  dialog.componentInstance.message =data.msg;
}

getBusinesses() {
  console.log('get Done');
return this
.http
.get(`${this.uri}/view`);
}

editBusiness(id) {
  console.log("id"+id)
return this
.http
.get(`${this.uri}/edit/${id}`);
}

updateBusiness(item_type,KC_Code,product, fabric, work_type, price, fileupload, id) {
  const obj = {
    item_type: item_type,
    KC_Code: KC_Code,
    product: product,
    fabric: fabric,
    work_type: work_type,
    price: price,
    fileupload : fileupload
    };
this
.http
.post(`${this.uri}/update/${id}`, obj)
.subscribe(res => 
this.router.navigate(['business']));
}
deleteBusiness(id) {
return this
.http
.get(`${this.uri}/delete/${id}`);
}
}