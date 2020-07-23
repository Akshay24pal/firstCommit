import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {
  toggle:Boolean=true;
  visitorForm: FormGroup;

  constructor(private commonService: CommonService,private _router: Router,
    private route: ActivatedRoute,private spinner: NgxSpinnerService,private formBuilder: FormBuilder) {
      this.createForm();
     }

     
     createForm() {
      this.visitorForm = this.formBuilder.group({
        firstName: ['', Validators.required ],
        lastName:['', Validators.required ],
        phoneNumber:['', Validators.required ],
        email:['', [Validators.required,Validators.email] ],
     });

    }

  houseDetails:any;
  error: any;
  uniqueHouseKey:any;
  private sub: any;
  questionList:any;
  houseId:any;

  get formError() { return this.visitorForm.controls; }

  ngOnInit(): void {
    this.spinner.show();
    this.sub = this.route.params.subscribe(params => {
      this.uniqueHouseKey=params.uniqueHouseKey;
      this.spinner.hide();
      // In a real app: dispatch action to load the details here.
   });
   this.getHouseDetails();
  }

  getHouseDetails(){
    this.spinner.show();
    this.commonService.get(`house/houseDetails/${this.uniqueHouseKey}`).subscribe((data: any)=>{
      this.houseDetails = data.data;
      if(this.houseDetails.isActive){
        this.houseId=this.houseDetails._id;
        this.getQuestions(this.houseId);
        this.spinner.hide();  
      }else{
        this._router.navigate(["**"]);
      }
      // this.url = `${this.baseURL}visitors/${data.data.uniqueHouseKey}`;
    },
    (error) => {       
       this.error=error.error.error;
       console.log('error',this.error);
       this.spinner.hide();
       this._router.navigate([""]);
    }); 
}

getQuestions(houseId){
  this.spinner.show();
  this.commonService.get(`questions/house/${houseId}`).subscribe((data: any)=>{
    this.questionList = data.data;
    this.spinner.hide();
  },
  (error) => {       
     this.error=error.error.error;
     console.log('error',this.error);
     this.spinner.hide();
  }); 
}
  showQue:any;
  count:any= 0;

  nextQuestion(answer){
    if(this.count === this.questionList.length){
      this._router.navigate(["visitor/6XOnmG"]);
    }else{
    this.count=this.count+1;
    this.showQue = this.questionList[this.count-1];
    }
  }

  
  onSubmit() {
    // TODO: Use EventEmitter with form value
      if(this.visitorForm.invalid){
        return ;
      }    
    this.spinner.show();
    let body={
      firstName:this.visitorForm.value.firstName,
      lastName:this.visitorForm.value.lastName,
      phoneNumber:this.visitorForm.value.phoneNumber,
      email:this.visitorForm.value.email,
      uniqueHouseKey:this.uniqueHouseKey,
    }
      this.commonService.post('visitors',body).subscribe((data: any)=>{
        this.spinner.hide();
        if(this.questionList.length > 0){
          this.toggle=false;
          this.showQue = this.questionList[this.count];
          this.count=this.count+1; 
        }else
        {
          this._router.navigate(["login"]);
        }
      // this._router.navigate(["visitor"]);
    },
    (error) => {                             
      this.error='Invalid credentials';
      console.log('error',this.error);
      this.spinner.hide();
  })
     
  }

}
