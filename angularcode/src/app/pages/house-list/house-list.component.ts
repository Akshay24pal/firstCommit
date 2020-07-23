import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router,NavigationEnd} from '@angular/router';
import { CommonService } from '../../core/services/common.service';
//import { filter, pairwise } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  url:string;
  houseList:any[];
  error:any;

  constructor(private commonService: CommonService,private router: Router,private spinner: NgxSpinnerService) {
    router.events.filter((event: any) => event instanceof NavigationEnd)
    .subscribe(event => {
        this.url=event.url;
        if(this.url=="/view-list")
        {
          $('.details').css("visibility", "visible");
          $(".details").css("display", "block");
        }
    });
   }

  ngOnInit(): void {
    this.getHouseList();
  }

  showDetails()
  {
    $('.details').css("visibility", "hidden");
    $(".details").css("display", "none");
  }
  setHouseId(id){
    localStorage.setItem('houseId',id);
  }
  getHouseList(){
    this.spinner.show();
    this.commonService.get(`house`).subscribe((data: any)=>{
      console.log(data);
      this.houseList = data.data;
      this.spinner.hide();
    },
    (error) => {       
       this.error=error.error.error;
       this.spinner.hide();
       console.log('error',this.error);
    });
}

}