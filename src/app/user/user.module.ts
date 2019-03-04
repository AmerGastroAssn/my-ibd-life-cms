import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserComponent } from './components/user.component';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ProgressbarModule,
        SharedModule,
    ],
    declarations: [
        UserComponent,
        UserListComponent,
        UserItemComponent,
        UserNewComponent,
        UserDetailsComponent,
        UserEditComponent,
        UserHomeComponent,
    ],
    providers: [
        UserService,
    ],
    exports: []
})
export class UserModule {}
