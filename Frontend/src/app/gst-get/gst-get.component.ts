import { Component, OnInit,ViewChild } from '@angular/core';
import Business from '../Business';
import { BusinessService } from '../business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort,MatDialog,MatTableDataSource  } from '@angular/material';
import { ConfirmationComponent } from '../confirmation/confirmation.component';


@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})



export class GstGetComponent implements OnInit {

  businesses: Business[];
  displayedColumns = ['Sr. No','Item_type','KC_Code','Product','Fabric','Type','Image','Edit','Delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private bs: BusinessService,private dialog:MatDialog,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
 
    if(sessionStorage.length == 0)
    {
      this.router.navigate(['home'])
    }

    this.getallitem();
  }

  

  getallitem()
  {
    
    this.bs
    .getBusinesses()
    .subscribe((data: Business[]) => {
     
      this.businesses = data;
      this.dataSource.data = this.businesses;
      this.dataSource.sort = this.sort;
      console.log("Get___"+JSON.stringify(this.businesses))
  });
  }

  OnDeleteScrip(data): void {
    //console.log("data in delete scrip------"+JSON.stringify(data))
    // dialog code here
    let dialog = this.dialog.open(ConfirmationComponent,{
      height: '200px',
      //width: '300px',
      disableClose: true,
    
    });
    
    dialog.componentInstance.message ='Are you sure you want to delete this Item?';
  
    dialog.afterClosed()
      .subscribe(selection => {
        
      if(selection==true)
      {
        this.deletedata(data); //to call delete scrip function after clicking on yes
     
      }
    });

}

  deletedata(id) {
    this.bs.deleteBusiness(id).subscribe(res => {
      console.log('Deleted');
      this.getallitem();
    });
  }

}

