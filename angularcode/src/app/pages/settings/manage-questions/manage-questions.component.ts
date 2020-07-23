import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd} from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  url:string;
  constructor(private commonService: CommonService,private router: Router,private spinner: NgxSpinnerService) {

    router.events.filter((event: any) => event instanceof NavigationEnd)
    .subscribe(event => {
        this.url=event.url;
        if(this.url=="/setting/manage-question")
        {
          $('.questions').css("visibility", "visible");
          $(".questions").css("display", "block");
        }
    });
   }

  houseList:any;
  error:any;

  ngOnInit(): void {
    this.getHouseList();
  }
  showDetails()
  {
    $('.questions').css("visibility", "hidden");
    $(".questions").css("display", "none");   
  }

  setHouseId(house){
    this.spinner.show();
    localStorage.setItem('houseId',house._id)
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
       console.log('error',this.error);
       this.spinner.hide();
    });
}

}
