import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomNavLinkEditComponent } from './components/custom-nav-link-edit/custom-nav-link-edit.component';
import { CustomNavLinkComponent } from './components/custom-nav-link.component';

import { CustomNavLinkRoutingModule } from './custom-nav-link-routing.module';

@NgModule({
    declarations: [
        CustomNavLinkComponent,
        CustomNavLinkEditComponent,
    ],
    imports: [
        CommonModule,
        CustomNavLinkRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class CustomNavLinkModule {}
