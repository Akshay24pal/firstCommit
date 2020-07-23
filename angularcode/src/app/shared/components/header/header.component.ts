import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as AnythingThatIsNotDollarSignOrSymbolOrjQuery from 'jquery';
import { CommonService } from '../../../core/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService) { }

  error :any;
  userData :any;
  ngOnInit(): void {
    this.getUserDetails();
  }

  navigateTo(path,status){
    console.log('status',status);
    let leadStatus = status ? status : null;
    localStorage.setItem('leadStatus',status);
    this._router.navigate([path]);
  }
  
  
  getUserDetails(){
    this.spinner.show();
    this.commonService.get(`users`).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
        this.error='Data not found';
        this.spinner.hide();
      }else{
        this.userData = data.data;
        console.log('userData',this.userData);
        this.spinner.hide();
      }
      
    });  

  }
  logout(){
    let body={
     };
     this.commonService.post('logout',body).subscribe((data: any)=>{
       console.log(data);
       if(data.status !== 201)
       {
        //  this.error='Error in login';
        //  console.log('error',this.error);
       }else{
         console.log("true");
         localStorage.clear();
        //  localStorage.remove('token');
         this._router.navigate(["login"]);
       }
     }) 

  }

}
