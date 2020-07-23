import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd} from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css']
})
export class EmailSettingsComponent implements OnInit {

  constructor(private commonService: CommonService,private router: Router)  { 

    this.form = new FormGroup({
      html: new FormControl()
    })
  }

  houseList:any;
  error:any;
  form: FormGroup;
  editor:boolean;

  ngOnInit(): void {
    this.editor=false;
    this.getHouseList();
  }

  getHouseList(){
    this.commonService.get(`house`).subscribe((data: any)=>{
      console.log(data);
      this.houseList = data.data;
    },
    (error) => {            
       this.error=error.error.error;
       console.log('error',this.error);
    });
}
select(value){
  alert("enter")
  this.editor=true
}
onSubmit(){
  console.log(this.form.value.html)

  let body={
    email:'gunjanj016@gmail.com',
    template:this.form.value,
  }
    this.commonService.post('users/sendTemplateMail',body).subscribe((data: any)=>{
      console.log('questions created',data);
     
    },
    (error) => {                             
      // this.error=error.error.error;
      this.error='Please enter correct Questions.';
      console.log('error',this.error);
     // this.spinner.hide();
  });

}

}
