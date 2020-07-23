import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  changePasswordForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  houseDetails:any;
  error: any;
  userId:any;
  private sub: any;

  ngOnInit(): void {
    this.spinner.show();
    this.sub = this.route.params.subscribe(params => {
      this.userId=params.userId;
      this.spinner.hide();
      // In a real app: dispatch action to load the details here.
   });
  }

  isValid(){
    if(this.changePasswordForm.value.password.toString() === this.changePasswordForm.value.confirmPassword.toString()){
      console.log('correct')
      return true;
    }else{
      console.log('not correct')
      return false;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.spinner.show();
    let body={
      password:this.changePasswordForm.value.password,
      confirmPassword:this.changePasswordForm.value.confirmPassword,
      _id:this.userId
    }
    if(this.isValid()){
      console.log(body);
      this.commonService.post('users/resetPassword',body).subscribe((data: any)=>{
      this.spinner.hide();
      this._router.navigate(["login"]);
      },
      (error) => {                             
        // this.error=error.error.error;
        this.error='Please enter correct password.';
        console.log('error',this.error);
        this.spinner.hide();

    })
    }else{
      this.spinner.hide();
      this.error='Please enter correct password';
    }
     
  }

}
