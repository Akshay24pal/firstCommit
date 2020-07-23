import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { ActiveComponent } from '../active/active.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-accepted-offer',
  templateUrl: './accepted-offer.component.html',
  styleUrls: ['./accepted-offer.component.css']
})
export class AcceptedOfferComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService) { }
  houseId :any ;
  uniqueHouseKey:any;
  houseDetails:any;
  error:any;
  leadList:any[];
  leadData:any;
  leadStatus:any='Active';  // this need to bind with nav bar  
  ngOnInit(){
    this.houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null ;
    this.uniqueHouseKey = localStorage.getItem('uniqueHouseKey') ? localStorage.getItem('uniqueHouseKey') : null ;
    this.leadStatus = localStorage.getItem('leadStatus') ? localStorage.getItem('leadStatus') : null ;
    ActiveComponent.houseDetails.subscribe((data: any)=>{
        console.log(data)
    })
    this.getHouseDetails();
    this.getLeadsList();
  }

  
  getHouseDetails(){
    this.spinner.show();
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null ;
    this.commonService.get(`house/${houseId}`).subscribe((data: any)=>{
      console.log(data);
      this.houseDetails = data.data;
      this.spinner.hide();
    },
    (error) => {       
       this.error=error.error.error;
       console.log('error',this.error);
       this.spinner.hide();
    }); 
}

  getLeadsList(){
    this.spinner.show();
    this.commonService.get(`visitors/getLeads/${this.uniqueHouseKey}/${this.leadStatus}`).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
        this.spinner.hide();
        this.error='Data not found';
      }else{
        this.spinner.hide();
        this.leadList = data.data;
      }
      
    });  

  }
  updateStatus(status,visitorId){
    this.spinner.show();
    let body={
      status:status
    }
    console.log('updateStatus',body,visitorId)
    this.commonService.put(`visitors/status/${visitorId}`,body).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
        this.error='Data not found';
        this.spinner.hide();
      }else{
        this.leadData = data.data;
        this.getLeadsList();
        this.spinner.hide();
      }
      
    });  

  }

}
