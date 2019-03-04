import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactComponent } from './components/contact.component';

const routes: Routes = [
    {
        path: 'contacts', component: ContactComponent, children: [
            { path: '', component: ContactListComponent },
            { path: ':id', component: ContactDetailsComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactRoutingModule {}
