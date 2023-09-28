import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';

import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

//Local
// const uri = 'http://localhost:8080/KC/uploads';
// const image_preview_uri = 'http://localhost:8080';

//Build
const uri = location.origin+'/KC/uploads';
const image_preview_uri = location.origin;

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  angForm: FormGroup;
  business: any = {};

uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];
constructor(private fb: FormBuilder, private bs: BusinessService,private router:Router,private route: ActivatedRoute) {
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
ngOnInit() {

  if(sessionStorage.length == 0)
  {
    this.router.navigate(['home'])
  }

  this.route.params.subscribe(params => {
    this.bs.editBusiness(params['id']).subscribe(res => {
      this.business = res;
      console.log("edit___"+JSON.stringify(this.business))
      this.imagePreview = this.business.fileupload;
    });
  });
}

createForm() {
  this.angForm = this.fb.group({
    item_type: ['', Validators.required ],
    KC_Code: ['', Validators.required ],
    product: ['', Validators.required ],
    fabric: ['', Validators.required ],
   // fileupload : ['', Validators.required ],
    work_type: ['', Validators.required ],
    price: ['', Validators.required ]
    });
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

    // if (files && file) {
    //     var reader = new FileReader();

    //     reader.onload =this._handleReaderLoaded.bind(this);

    //     reader.readAsBinaryString(file);
    // }


}



  updateBusiness(item_type,KC_Code,product, fabric, work_type, price) {
   this.route.params.subscribe(params => {
      this.bs.updateBusiness(item_type,KC_Code,product, fabric, work_type, price,this.imagePreview, params['id']);
     
   });
}
}
