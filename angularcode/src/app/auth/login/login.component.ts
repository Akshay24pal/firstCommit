import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
      this.createForm();
     }

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  loginForm: FormGroup;
  passwordType:any=false;

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
    ] 
  ],
      password:['', Validators.required ],
   });
  }
  error: any;
  
  ngOnInit(): void {
  }

  passwordShow(){
    this.passwordType=!this.passwordType;

  }

  emptyError(){
    this.error=''; 
  }

  get formError() { return this.loginForm.controls; }


  onSubmit() {
    console.log(this.loginForm.invalid);
    if(this.loginForm.invalid){
    return ;
    }
    // if(this.loginForm.valid){
      
    this.spinner.show();
    // TODO: Use EventEmitter with form value
    let body={
     email:this.loginForm.value.email,
     password:this.loginForm.value.password, 
    }
      this.commonService.post('login',body).subscribe((data: any)=>{
        let token=data.token;
          localStorage.setItem('token',token);
          this.spinner.hide();
          this._router.navigate(["dashboard"]);
      },
      (error) => {                             
        // this.error=error.error.error;
        this.spinner.hide();
        this.error='Invalid email or password';
        console.log('error',this.error);
    })

  // }else{
  //   this.spinner.hide();
  //   this.error='Please enter email and password';
  //   console.log('error',this.error);
  // }
     
  }

 
 

}
