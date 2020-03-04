import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactComponent } from './components/contact.component';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactService } from './services/contact.service';

@NgModule({
    declarations: [
        ContactComponent,
        ContactListComponent,
        ContactDetailsComponent,
    ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        SharedModule,
    ],
    providers: [
        ContactService,
    ],
    exports: []
})
export class ContactModule {}
