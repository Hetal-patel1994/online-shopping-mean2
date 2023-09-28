import { Component, OnInit } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import Business from '../Business';
import { BusinessService } from '../business.service';
//import 'bootstrap';
//import { Swiper } from 'swiper/dist/js/swiper';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

//declare var $: any;
//
//declare var Swiper :any;

export class HomeComponent implements OnInit {


  saree: Business[];
  legging: Business[];
  palazzo: Business[];
  constructor(private bs: BusinessService) { }

  ngOnInit() {
    console.log("get")
    this.bs
    .getBusinesses()
    .subscribe((data: Business[]) => {

      this.saree=data.filter(function(item){
        return item.item_type=="Saree";         
    });

    this.legging=data.filter(function(item){
      return item.item_type=="Legging";         
  });

  this.palazzo=data.filter(function(item){
    return item.item_type=="Palazzo";         
});

      
      setTimeout(() => {
    console.log('hide');
    this.jquerycode();
  }, 100);
 
  });
 
  
  
  }

config: SwiperOptions = {
  autoplay: 3000, // Autoplay option having value in milliseconds
  initialSlide: 4, // Slide Index Starting from 0
  slidesPerView: 4, // Slides Visible in Single View Default is 1
  pagination: '.swiper-pagination', // Pagination Class defined
  paginationClickable: true, // Making pagination dots clicable
  nextButton: '.swiper-button-next', // Class for next button
  prevButton: '.swiper-button-prev', // Class for prev button
  spaceBetween: 50 // Space between each Item
};

jquerycode(){

  (function() {

    // store the slider in a local variable
    var $window = $(window),
        flexslider = { vars:{} };

    // tiny helper function to add breakpoints
    function getGridSize() {
      return (window.innerWidth < 600) ? 1 :
             (window.innerWidth < 900) ? 3 : 4;
    }

    $(function() {
     // SyntaxHighlighter.all();
    });

    $('.flexslider').flexslider({
      animation: "slide",
      animationSpeed: 400,
      animationLoop: true,
      itemWidth: 150,
      itemMargin: 20,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(), // use function to pull in initial value
      start: function(slider){
        $('body').removeClass('loading');
        flexslider = slider;
      }
    });
    var gridSize = getGridSize();
    $window.load(function() {
      $('.flexslider').flexslider({
        animation: "slide",
        animationSpeed: 400,
        animationLoop: true,
        itemWidth: 150,
        itemMargin: 20,
        minItems: getGridSize(), // use function to pull in initial value
        maxItems: getGridSize(), // use function to pull in initial value
        start: function(slider){
          $('body').removeClass('loading');
          flexslider = slider;
        }
      });
    });

    // check grid size on resize event
    $window.resize(function() {
      var gridSize = getGridSize();

     // flexslider.vars.minItems = gridSize;
     // flexslider.vars.maxItems = gridSize;
    });
  }());



}

}



