import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) { 
      this.createForm();
    }

    
  createForm() {
    this.editForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email] ],
      phoneNumber:['', Validators.required ],
      website:['', Validators.required ],
      officeName:['', Validators.required ],
      officeAddress:['', Validators.required ],
      designation:['', Validators.required ],
      officePhoneNumber:['', Validators.required ],
      firstName:['', Validators.required ],
      lastName:['', Validators.required ],
    });

  }

  get formError() { return this.editForm.controls; }

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
  profileImage:any;
  agentSignature:any;

  profile:any;
  signature:any;
  

  ngOnInit(): void {
    this.getUserDetails();
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
        this.firstName=this.userData.firstName ? this.userData.firstName : '';
        this.lastName=this.userData.lastName ? this.userData.lastName : '';
        this.email=this.userData.email;
        this.phoneNumber=this.userData.phoneNumber ? this.userData.phoneNumber : '';
        this.designation=this.userData.designation ? this.userData.designation : '';
        this.website=this.userData.website ? this.userData.website : '';
        this.officeName=this.userData.officeName ? this.userData.officeName : '';
        this.officeAddress=this.userData.officeAddress ? this.userData.officeAddress : '';
        this.officePhoneNumber=this.userData.officePhoneNumber ? this.userData.officePhoneNumber : '';
        this.profileImage=this.userData.profileImage ? this.userData.profileImage : '',
        this.agentSignature=this.userData.agentSignature ? this.userData.agentSignature : '',
        this.spinner.hide();
      }
    },(error)=>{
      this.spinner.hide();
    });  

  }

  updateUserDetails(){
    this.spinner.show();
    if(this.editForm.invalid){
      return ;
      }

    if(!this.profileImage){
      this.error='upload the profile image';
      return ;
    }

    if(!this.agentSignature){
      this.error='upload the agent signature';
      return ;
    }

   let body={
        firstName:this.firstName ? this.firstName : '',
        lastName:this.lastName ? this.lastName : '',
        email:this.email,
        phoneNumber:this.phoneNumber ? this.phoneNumber : '',
        designation:this.designation ? this.designation : '',
        website:this.website ? this.website : '',
        officeName:this.officeName ? this.officeName : '',
        officeAddress:this.officeAddress ? this.officeAddress : '',
        officePhoneNumber:this.officePhoneNumber ? this.officePhoneNumber : '',
        agentSignature:this.agentSignature ? this.agentSignature : '',
        profileImage:this.profileImage ? this.profileImage : '',
        
   };
    this.commonService.put(`users`,body).subscribe((data: any)=>{
      console.log(data);
      if(data.status !== 201)
      {
        this.spinner.hide();
        this.error='Data not found';
      }else{
        this.userData = data.data;
        this.spinner.hide();
        this._router.navigate(["view-profile"]);
      }
      
    });  

  }

  onProfileChange(event){
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.profile = file;
      }
      // this.uploadFile(this.profile);
    }

  onSignatureChange(event){
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.signature = file;
      }
      // this.uploadFile(this.signature);
    }

    uploadFile(state) {  
      let file; 
      this.spinner.show();
      if(this.profile || this.signature ){ 

      // }else{
      //   this.error='Please select file';
      // }
      if(state === 'profile'){
        file = this.profile;
      }else if(state === 'signature'){
        file = this.signature;
      }
      console.log('file',file)
      const formData = new FormData();  
      formData.append('file', file);  
      this.commonService.post('users/upload',formData).subscribe((data: any)=>{
        if(state === 'profile'){
          this.profileImage = data.data;
          this.spinner.hide();
        }else if(state === 'signature'){
          this.agentSignature = data.data;
          this.spinner.hide();
        }
      },(error)=>{
        console.log('this.profile error',error);
        this.spinner.hide();
      });

    }else{
        this.error='Please select file';
      }
    }


}
