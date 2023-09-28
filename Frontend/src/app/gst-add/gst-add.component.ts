
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router,NavigationEnd } from "@angular/router";
//import { FileService } from './file.service';
import { BusinessService } from '../business.service';

import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

//Local
//const uri = 'http://localhost:8080/KC/uploads';
//const image_preview_uri = 'http://localhost:8080';

//Build
const uri = location.origin+'/KC/uploads';
const image_preview_uri = location.origin;

@Component({
selector: 'app-gst-add',
templateUrl: './gst-add.component.html',
styleUrls: ['./gst-add.component.css']
})


export class GstAddComponent implements OnInit {
angForm: FormGroup;
uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];
constructor(private fb: FormBuilder, private bs: BusinessService,private router:Router) {
this.createForm();

this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
 console.log(JSON.stringify(response))
 console.log(JSON.parse(response))
 
 this.attachmentList.push(JSON.parse(response));
 this.imageattach = JSON.parse(response);
 this.imagePreview = image_preview_uri+'/'+this.imageattach.uploadname

 console.log(JSON.stringify(this.imagePreview))
 //console.log(JSON.parse(response))
}



}





createForm() {
this.angForm = this.fb.group({
item_type: ['', Validators.required ],
KC_Code: ['', Validators.required ],
product: ['', Validators.required ],
fabric: ['', Validators.required ],
//fileupload : ['', Validators.required ],
work_type: ['', Validators.required ],
price: ['', Validators.required ]
});
}
addBusiness(item_type ,KC_Code,product, fabric, work_type, price) {
//console.log(this.filestring)
this.bs.addBusiness(item_type,KC_Code,product, fabric, work_type, price,this.imagePreview);
}


selectedimage = null;
filestring = null;
selectedfile = null;
imageattach = null;
imagePreview = null;


onFileChanged(event) {

    this.router.navigate(['/', 'contact']).then(nav => {
        console.log("success____"+nav); // true if navigation is successful
      }, err => {
        console.log("error_____"+err) // when there's an error
      });

  var files = event.target.files;
  console.log("files"+JSON.stringify(files))
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }


}


_handleReaderLoaded(readerEvt) {

  var binaryString = readerEvt.target.result;
            //this.imagePreview= btoa(binaryString);
            console.log(btoa(binaryString));

}

// upload(img: File) {
//   var formData: FormData = new FormData();
//   formData.append("image", img, img.name);
//    console.log("upload form")
//   var xhr = new XMLHttpRequest();
//   xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
//   });
//   xhr.open("PUT", "http://localhost:4000/KC/uploads", true);
//   console.log("form____"+JSON.stringify(formData))
//   xhr.send(formData);
// }

ngOnInit() {

  if(sessionStorage.length == 0)
  {
    this.router.navigate(['home'])
  }
}
}
