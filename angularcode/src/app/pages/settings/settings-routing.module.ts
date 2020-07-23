import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { AddManageQuestionComponent } from './add-manage-question/add-manage-question.component'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'manage-question',
        component: ManageQuestionsComponent,
        children: [
          { path: 'add-manage', component: AddManageQuestionComponent }
         ]
      },
      {
        path: 'email-setting',
        component: EmailSettingsComponent,
      },
      {
        path: '',
        redirectTo: 'manage-question',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
