import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, PopoverModule, ProgressbarModule } from 'ngx-bootstrap';
import { ImageModule } from '../image/image.module';
import { SharedModule } from '../shared/shared.module';
import { PageAttendeePlanningListComponent } from './components/page-attendee-planning-list/page-attendee-planning-list.component';
import { PageDetailsComponent } from './components/page-details/page-details.component';
import { PageEditComponent } from './components/page-edit/page-edit.component';
import { PageEducationListComponent } from './components/page-education-list/page-education-list.component';
import { PageExhibitorInformationListComponent } from './components/page-exhibitor-information-list/page-exhibitor-information-list.component';
import { PageItemComponent } from './components/page-item/page-item.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageNewComponent } from './components/page-new/page-new.component';
import { PageNewsAndMediaListComponent } from './components/page-news-and-media-list/page-news-and-media-list.component';
import { PagePresentersListComponent } from './components/page-presenters-list/page-presenters-list.component';
import { PageRegisterListComponent } from './components/page-register-list/page-register-list.component';
import { PageComponent } from './components/page.component';

import { PageRoutingModule } from './page-routing.module';

@NgModule({
    declarations: [
        PageComponent,
        PageNewComponent,
        PageListComponent,
        PageItemComponent,
        PageEditComponent,
        PageDetailsComponent,
        PageRegisterListComponent,
        PagePresentersListComponent,
        PageNewsAndMediaListComponent,
        PageAttendeePlanningListComponent,
        PageEducationListComponent,
        PageExhibitorInformationListComponent,
    ],
    imports: [
        CommonModule,
        PageRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BsDatepickerModule,
        MatProgressBarModule,
        ProgressbarModule,
        MatSlideToggleModule,
        CKEditorModule,
        MatTooltipModule,
        MatSelectModule,
        PopoverModule.forRoot(),
        ImageModule,
    ],
    exports: [],
    entryComponents: []
})
export class PageModule {}
