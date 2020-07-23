import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  @Output()
  public static houseDetails: EventEmitter<any> = new EventEmitter<any>();
  houseList:any[];
  error:any;
  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getHouseList();
  }

  selectHouse(house){
     this.spinner.show();
    localStorage.setItem('houseId',house._id);
    localStorage.setItem('uniqueHouseKey',house.uniqueHouseKey);
    ActiveComponent.houseDetails.emit({ id: house });
     this.spinner.hide();
    this._router.navigate(["accepted-offer"]);
  }
  getHouseList(){
    this.spinner.show();
    this.commonService.get(`house`).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
         this.spinner.hide();
        this.error='Data not found';
      }else{
        this.houseList = data.data;
        console.log(this.houseList)
       this.spinner.hide();
      }
      
    });  

  }
}
