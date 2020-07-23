import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-open-house',
  templateUrl: './add-open-house.component.html',
  styleUrls: ['./add-open-house.component.css']
})
export class AddOpenHouseComponent implements OnInit {
  error: any;
  houseImageFile :any;
  houseImage:any;
  
  addHouseForm: FormGroup;

  constructor(private commonService: CommonService,private _router: Router,private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
      this.createForm();
     }

     createForm() {
      this.addHouseForm = this.formBuilder.group({
        title: ['', Validators.required ],
        description:['', Validators.required ],
        country:['', Validators.required ],
        address:['', Validators.required ],
        city:['', Validators.required ],
        state:['', Validators.required ],
        zipCode:['', Validators.required ],
     });

    }

  ngOnInit(): void {
  }

  get formError() { return this.addHouseForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(this.addHouseForm.invalid){
      return ;
      }

    if(!this.houseImage){
      this.error='upload the picture';
      return ;
    }

      this.spinner.show();
      let body={
       title:this.addHouseForm.value.title,
       description:this.addHouseForm.value.description,
       country:this.addHouseForm.value.country,
       address:this.addHouseForm.value.address,
       city:this.addHouseForm.value.city,
       state:this.addHouseForm.value.state,
       zipCode:this.addHouseForm.value.zipCode,
       houseImage:this.houseImage
      }
      console.log(body);
      this.commonService.post('house',body).subscribe((data: any)=>{
        console.log(data);
        if(data.status !== 201)
        {
          this.spinner.hide();
          this.error='Data not found';
          console.log('error',this.error);
           this.spinner.hide();
        }else{
           this.spinner.hide();
          this._router.navigate(["view-list"]);
        }
        this.spinner.hide();
        // this.products = data;
      },(error)=>{
        this.spinner.hide();
          this.error='Enter all the required Fields';
          console.log('error',this.error);
      });
  }

  
  onChangeFile(event){
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.houseImageFile = file;
      }
    }

    uploadFile() {  
      console.log('uploadFile');
      if(this.houseImageFile){      
      let file; 
      this.spinner.show();
      file = this.houseImageFile;
      const formData = new FormData();  
      formData.append('file', file);  
      this.commonService.post('users/upload',formData).subscribe((data: any)=>{
        console.log('data',data);
          this.houseImage = data.data;
          console.log('this.houseImage',this.houseImage);
          this.spinner.hide();
      },(error)=>{
        this.spinner.hide();
        console.log('this.profile error',error);
      });
      
      }else{
        this.error='Please select file';
      }

    }
    
}
