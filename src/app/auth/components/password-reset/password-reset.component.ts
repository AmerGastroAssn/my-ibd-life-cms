import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Email {
    email: string,
    password?: string,
}

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    resetForm: FormGroup;
    email: Email;
    favicon = 'fa fa-envelope-open';
    sectionName = 'Password Reset';


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
    }

    // For Form Validations
    get f() {
        return this.resetForm.controls;
    }

    ngOnInit() {
        this.resetForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
        });

        this.email = this.resetForm.value.email;
    }

    onSubmit(email: FormGroup) {
        if (this.resetForm.valid) {
            this.authService.resetPassword(email);
            this.resetForm.reset();
        }
    }
}
