import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { PageAttendeePlanningListComponent } from './components/page-attendee-planning-list/page-attendee-planning-list.component';
import { PageDetailsComponent } from './components/page-details/page-details.component';
import { PageEditComponent } from './components/page-edit/page-edit.component';
import { PageEducationListComponent } from './components/page-education-list/page-education-list.component';
import { PageExhibitorInformationListComponent } from './components/page-exhibitor-information-list/page-exhibitor-information-list.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageNewComponent } from './components/page-new/page-new.component';
import { PageNewsAndMediaListComponent } from './components/page-news-and-media-list/page-news-and-media-list.component';
import { PagePresentersListComponent } from './components/page-presenters-list/page-presenters-list.component';
import { PageRegisterListComponent } from './components/page-register-list/page-register-list.component';
import { PageComponent } from './components/page.component';

const routes: Routes = [
    {
        path: 'pages', component: PageComponent,
        children: [
            { path: '', component: PageListComponent, canActivate: [AuthGuard] },
            { path: 'register', component: PageRegisterListComponent },
            { path: 'attendee-planning', component: PageAttendeePlanningListComponent },
            { path: 'education', component: PageEducationListComponent },
            { path: 'exhibitor-information', component: PageExhibitorInformationListComponent },
            { path: 'news', component: PageNewsAndMediaListComponent },
            { path: 'presenters', component: PagePresentersListComponent },
            { path: 'new', component: PageNewComponent, canActivate: [AuthGuard] },
            { path: ':id', component: PageDetailsComponent, canActivate: [AuthGuard] },
            { path: ':id/edit', component: PageEditComponent, canActivate: [AuthGuard] },
        ], canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PageRoutingModule {}
