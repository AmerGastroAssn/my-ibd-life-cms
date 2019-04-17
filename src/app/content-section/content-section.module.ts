import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageModule } from '../image/image.module';
import { SharedModule } from '../shared/shared.module';
import { CallToActionDetailComponent } from './components/call-to-action/call-to-action-detail/call-to-action-detail.component';
import { CallToActionEditComponent } from './components/call-to-action/call-to-action-edit/call-to-action-edit.component';

import { CallToActionListComponent } from './components/call-to-action/call-to-action-list/call-to-action-list.component';
import { CallToActionNewComponent } from './components/call-to-action/call-to-action-new/call-to-action-new.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { TextSectionDetailComponent } from './components/text-section/text-section-detail/text-section-detail.component';
import { TextSectionEditComponent } from './components/text-section/text-section-edit/text-section-edit.component';

import { TextSectionListComponent } from './components/text-section/text-section-list/text-section-list.component';
import { TextSectionNewComponent } from './components/text-section/text-section-new/text-section-new.component';
import { TextSectionComponent } from './components/text-section/text-section.component';
import { ContentSectionRoutingModule } from './content-section-routing.module';
import { CallToActionService } from './services/call-to-action.service';
import { TextSectionService } from './services/text-section.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        RouterModule,
        MatTooltipModule,
        ContentSectionRoutingModule,
        SharedModule,
        ImageModule,
    ],
    declarations: [
        CallToActionComponent,
        CallToActionNewComponent,
        CallToActionEditComponent,
        CallToActionListComponent,
        CallToActionDetailComponent,
        TextSectionComponent,
        TextSectionNewComponent,
        TextSectionEditComponent,
        TextSectionListComponent,
        TextSectionDetailComponent,
    ],
    exports: [],
    entryComponents: [
        // SafeHtmlPipe
    ],
    providers: [
        TextSectionService,
        CallToActionService,
    ]
})
export class ContentSectionModule {}
