import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../user/modals/user';
import { AuthService } from '../../services/auth.service';

interface Email {
    email: string,
    password: string,
}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    user: User;
    email: string;
    password: string;
    favicon = 'fa fa-user-lock';
    sectionName = 'Login';


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.router.navigate(['/pages']);
            }
        });
    }

    // For Form Validations
    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])]
        });

        this.email = this.loginForm.value.email;
        this.password = this.loginForm.value.password;
    }

    onLogin(formData: Email) {
        if (this.loginForm.valid) {
            this.authService.login(formData);
            this.loginForm.reset();
        }
    }
}
