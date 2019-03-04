import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, ProgressbarModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { PressReleaseDetailsComponent } from './components/press-release-details/press-release-details.component';
import { PressReleaseEditComponent } from './components/press-release-edit/press-release-edit.component';
import { PressReleaseItemComponent } from './components/press-release-item/press-release-item.component';
import { PressReleaseListComponent } from './components/press-release-list/press-release-list.component';
import { PressReleaseNewComponent } from './components/press-release-new/press-release-new.component';
import { PressReleaseComponent } from './components/press-release.component';
import { PressReleaseRoutingModule } from './press-release-routing.module';
import { PressReleaseService } from './services/press-release.service';

@NgModule({
    declarations: [
        PressReleaseComponent,
        PressReleaseItemComponent,
        PressReleaseNewComponent,
        PressReleaseEditComponent,
        PressReleaseDetailsComponent,
        PressReleaseListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PressReleaseRoutingModule,
        RouterModule,
        BsDatepickerModule,
        MatProgressBarModule,
        ProgressbarModule,
        MatSlideToggleModule,
        CKEditorModule,
        SharedModule,
    ],
    providers: [
        PressReleaseService,
    ]
})
export class PressReleaseModule {}
