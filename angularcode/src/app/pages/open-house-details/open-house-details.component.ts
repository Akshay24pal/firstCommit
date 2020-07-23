import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { constants } from '../../core/utils/constants';
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from 'jquery';

@Component({
  selector: 'app-open-house-details',
  templateUrl: './open-house-details.component.html',
  styleUrls: ['./open-house-details.component.css']
})
export class OpenHouseDetailsComponent implements OnInit {

  constructor(private commonService: CommonService,private router: Router,private spinner: NgxSpinnerService) { }

  houseDetails:any;
  error:any;
  url:any;
  baseURL:any=constants.angularBaseURL;
  ngOnInit(): void {
    $('.details').css("visibility", "hidden");
    $(".details").css("display", "none");
    this.getHouseDetails();
  }

  getHouseDetails(){
    this.spinner.show();
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null ;
    this.commonService.get(`house/${houseId}`).subscribe((data: any)=>{
      console.log(data);
      this.houseDetails = data.data;
      this.url = `${this.baseURL}visitor/${data.data.uniqueHouseKey}`;
      this.spinner.hide();
    },
    (error) => {       
       this.error=error.error.error;
       console.log('error',this.error);
       this.spinner.hide();
    }); 
}

  beginOpenHouse(status){
    this.spinner.show();
      let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null ;
      this.commonService.get(`house/beginOpenHouse/${houseId}/${status}`).subscribe((data: any)=>{
        console.log(data);
        this.houseDetails = data.data;
        this.url = `${this.baseURL}visitor/${data.data.uniqueHouseKey}`;
        this.spinner.hide();
      },
      (error) => {       
        this.error=error.error.error;
        console.log('error',this.error);
        this.spinner.hide();
      }); 
    
  }

  share(){

  }

  openLink(){
    console.log('this.houseDetails.isActive',this.houseDetails.isActive);
    if(this.houseDetails.isActive){
      window.open(this.url,'_blank');
    }
  }

}
