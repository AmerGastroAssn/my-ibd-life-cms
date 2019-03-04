import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        PasswordResetComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        AuthService,
    ]
})
export class AuthModule {}
