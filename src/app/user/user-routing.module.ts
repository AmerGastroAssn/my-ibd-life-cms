import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserComponent } from './components/user.component';

const userRoutes: Routes = [
    {
        path: 'users', component: UserComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'new', component: UserNewComponent },
            { path: ':id', component: UserDetailsComponent },
            { path: ':id/edit', component: UserEditComponent },
        ], canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {}
