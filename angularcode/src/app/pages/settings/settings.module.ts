import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import {PagesModule} from './../pages.module';
import { AddManageQuestionComponent } from './add-manage-question/add-manage-question.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    SettingsComponent,
    ManageQuestionsComponent,
    EmailSettingsComponent,
    AddManageQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,PagesModule,
    NgxSpinnerModule,
    NgxSummernoteModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule { }
