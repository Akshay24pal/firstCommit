import { Component, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-add-manage-question',
  templateUrl: './add-manage-question.component.html',
  styleUrls: ['./add-manage-question.component.css']
})
export class AddManageQuestionComponent implements OnInit {


  constructor(private commonService: CommonService, private _router: Router,
    private spinner: NgxSpinnerService, private modalService: BsModalService) { }
  questionType: string = "single";
  questionOptionsArray = [];
  questionOption: string = "";
  modalRef: BsModalRef;
  addModalRef: BsModalRef;
  houseDetails: any;
  questionList: any[];
  error: any;
  // title:any;
  editTitle: any;
  editId: any;

  addQuestionForm = new FormGroup({
    title: new FormControl(''),
    questionOption: new FormControl(''),
  });

  editQuestionForm = new FormGroup({
    editTitle: new FormControl(''),
    questionOption: new FormControl(''),
  });
  ngOnInit(): void {
    $('.questions').css("visibility", "hidden");
    $(".questions").css("display", "none");
    this.getHouseDetails();
    this.getQuestions();
  }
  editData: any;
  openModal(template: TemplateRef<any>, editId) {
    this.modalRef = this.modalService.show(template);
    this.editId = editId;
    this.editData = this.questionList.filter(que => que._id === this.editId);
    this.editTitle = this.editData[0].title;
  }

  openAddModal(addTemplate: TemplateRef<any>) {
    this.addModalRef = this.modalService.show(addTemplate);
  }

  getHouseDetails() {
    this.spinner.show();
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null;
    this.commonService.get(`house/${houseId}`).subscribe((data: any) => {
      console.log('houseList-->', data);
      this.houseDetails = data.data;
      this.spinner.hide();
    },
      (error) => {
        this.error = error.error.error;
        console.log('error', this.error);
        this.spinner.hide();
      });
  }

  getQuestions() {
    this.spinner.show();
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null;
    console.log('houseId', houseId);
    this.commonService.get(`questions/house/${houseId}`).subscribe((data: any) => {
      console.log('questionList-->', data);
      this.questionList = data.data;
      this.spinner.hide();
    },
      (error) => {
        this.error = error.error.error;
        console.log('error', this.error);
        this.spinner.hide();
      });
  }

  closeModal() {
    this.addModalRef.hide();
    this.addQuestionForm.reset();
  }

  onSubmit() {
    this.spinner.show();
    // TODO: Use EventEmitter with form value
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null;
    let answers = [
      { "answer": "Yes" },
      { "answer": "No" }
    ];
    let body = {
      title: this.addQuestionForm.value.title,
      houseId: houseId,
      answers: JSON.stringify(answers)
    }
    this.commonService.post('questions', body).subscribe((data: any) => {
      console.log('questions created', data);
      this.spinner.hide();
      this.getQuestions();
      this.addModalRef.hide();
      this.addQuestionForm.reset();
      this._router.navigate(["/setting/manage-question/add-manage"]);
    },
      (error) => {
        // this.error=error.error.error;
        this.error = 'Please enter correct Questions.';
        console.log('error', this.error);
        this.addModalRef.hide();
        this.spinner.hide();
      });

  }

  updateQuestion() {
    this.spinner.show();
    // TODO: Use EventEmitter with form value
    let houseId = localStorage.getItem('houseId') ? localStorage.getItem('houseId') : null;
    let answers = [
      { "answer": "Yes" },
      { "answer": "No" }
    ];
    let body = {
      title: this.editTitle,
      houseId: houseId,
      _id: this.editId,
      answers: JSON.stringify(answers)
    }
    this.commonService.put('questions', body).subscribe((data: any) => {
      console.log('questions updated', data);
      this.spinner.hide();
      this.modalRef.hide()
      this.getQuestions();
      this._router.navigate(["/setting/manage-question/add-manage"]);
    },
      (error) => {
        // this.error=error.error.error;
        this.error = 'Please enter correct Questions.';
        console.log('error', this.error);
        this.modalRef.hide()
        this.spinner.hide();
      });

  }

  removeQuestion(question) {
    this.spinner.show();
    this.commonService.delete(`questions/${question._id}`, question._id).subscribe((data: any) => {
      console.log('questions deleted', data);
      this.spinner.hide();
      this.getQuestions();
      this._router.navigate(["/setting/manage-question/add-manage"]);
    },
      (error) => {
        // this.error=error.error.error;
        this.error = 'Please enter correct Questions.';
        this.spinner.hide();
        console.log('error', this.error);
      });
  }

  changeOption(event) {
    this.questionType = event.target.value;
  }
  addQuestionOption() {

    this.questionOptionsArray.push(this.questionOption)
    this.questionOption = ""
    console.log(this.questionOptionsArray)
  }

}
