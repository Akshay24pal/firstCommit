import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService) { }

  userData:any;
  error:any;
  email:any;
  phoneNumber:any;
  website:any;
  designation:any;
  officeName:any;
  officeAddress:any;
  officePhoneNumber:any;
  firstName:any;
  lastName:any;

  ngOnInit(): void {
    // this.spinner.show();
    this.getUserDetails();
  }

  getUserDetails(){
    this.spinner.show();
    this.commonService.get(`users`).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
        this.spinner.hide();
        this.error='Data not found';
      }else{
        this.userData = data.data;
        console.log('this.userData',this.userData)
        this.firstName=this.userData.firstName ? this.userData.firstName : '';
        this.lastName=this.userData.lastName ? this.userData.lastName : '';
        this.email=this.userData.email;
        this.phoneNumber=this.userData.phoneNumber ? this.userData.phoneNumber : '';
        this.designation=this.userData.designation ? this.userData.designation : '';
        this.website=this.userData.website ? this.userData.website : '';
        this.officeName=this.userData.officeName ? this.userData.officeName : '';
        this.officeAddress=this.userData.officeAddress ? this.userData.officeAddress : '';
        this.officePhoneNumber=this.userData.officePhoneNumber ? this.userData.officePhoneNumber : '';
        this.spinner.hide();
      }
      
    });  

  }


}
