import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
      this.createForm();
     }
  resetForm: FormGroup;

  ngOnInit(): void {
  }

  
  createForm() {
    
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email] ],
    });

  }

  get formError() { return this.resetForm.controls; }


  // resetForm = new FormGroup({
  //   email: new FormControl(''),
  // });

  error: any;

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(this.resetForm.invalid){
        return ;
    }
    let body={
     email:this.resetForm.value.email,
    }
    this.spinner.show();
    console.log(body);
    this.commonService.post('users/sendVerificationMail',body).subscribe(
      (data: any)=>{
        this.spinner.hide();
        console.log(data);
        this._router.navigate(["login"]);
    },(error) => {                             
      console.error('error caught in component')
      console.log("error",error);
      this.spinner.hide();
    })  
  }
}