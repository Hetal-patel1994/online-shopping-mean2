import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Business from '../Business';
import { BusinessService } from '../business.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  businesses: Business[];
  saree: Business[];
  legging: Business[];
  palazzo: Business[];
  full_param:any;
  type:any;
  constructor(private bs: BusinessService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.full_param = this.route.params;
      this.type = this.full_param._value.type;
      console.log("type_name"+JSON.stringify(this.type));
      this.bs
      .getBusinesses()
      .subscribe((data: Business[]) => {
       
        
        if(this.type == 'Saree')
        {
          this.businesses=data.filter(function(item){
            return item.item_type=="Saree";         
        });
        }
        else if(this.type == 'Legging')
        {
          this.businesses=data.filter(function(item){
            return item.item_type=="Legging";         
        });
        }
        else if(this.type == 'Palazzo')
        {
          this.businesses=data.filter(function(item){
            return item.item_type=="Palazzo";         
        });
        }
  
    });
  
    });
     }

}
