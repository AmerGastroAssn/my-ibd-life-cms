import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HomepageEditComponent } from './components/homepage-edit/homepage-edit.component';
import { HomepageComponent } from './components/homepage.component';

import { HomepageRoutingModule } from './homepage-routing.module';
import { CountdownService } from './services/countdown.service';
import { HomepageService } from './services/homepage.service';

@NgModule({
    declarations: [
        HomepageComponent,
        HomepageEditComponent,
    ],
    imports: [
        CommonModule,
        HomepageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        SharedModule,
        ModalModule.forRoot()
    ],
    providers: [
        HomepageService,
        CountdownService,
    ]
})
export class HomepageModule {}
