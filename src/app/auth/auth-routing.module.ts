import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { SignupComponent } from './components/signup/signup.component';

const authRoutes: Routes = [
    {
        path: 'auth', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent, canActivate: [AdminGuard] },
            { path: 'password-reset', component: PasswordResetComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {}
