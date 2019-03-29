import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { PageDetailsComponent } from './components/page-details/page-details.component';
import { PageEditComponent } from './components/page-edit/page-edit.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageNewComponent } from './components/page-new/page-new.component';
import { PageComponent } from './components/page.component';

const routes: Routes = [
    {
        path: 'pages', component: PageComponent,
        children: [
            { path: '', component: PageListComponent, canActivate: [AuthGuard] },
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
