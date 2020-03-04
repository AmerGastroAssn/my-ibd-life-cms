import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../user/modals/user';
import { PrivacyPolicy } from '../../models/privacy-policy';
import { PrivacyPolicyService } from '../../services/privacy-policy.service';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
    privacyPolicyForm: FormGroup;
    privacyPolicy: PrivacyPolicy;
    id: string;
    body: string;
    updatedAt: number = Date.now();
    uid: string;
    author: string;
    currentUser: User;
    favicon = 'fa fa-file-signature';
    sectionName = 'Privacy Policy';

    CkeditorConfig = {
        allowedContent: true,
        height: 700,
        extraAllowedContent: 'div;span;ul;li;table;td;style;*[id,rel];*(*);*{*}',
    };

    constructor(
        private privacyPolicyService: PrivacyPolicyService,
        private fb: FormBuilder,
        private sbAlert: MatSnackBar,
        private authService: AuthService,
    ) {
        this.updatedAt = Date.now();
        this.currentUser = this.authService.getProfile().displayName;
    }

    get f() {
        return this.privacyPolicyForm.controls;
    }

    ngOnInit() {
        // Get PrivacyPolicy
        this.privacyPolicyService.getPrivacyPolicy().subscribe((privacyPolicy) => {
            if (privacyPolicy !== null) {
                this.privacyPolicy = privacyPolicy;
                // Form:
                this.privacyPolicyForm = this.fb.group({
                    author: [this.currentUser || ''],
                    id: [this.privacyPolicyService.id],
                    body: [this.privacyPolicy.body],
                    updatedAt: [this.updatedAt],
                });

                this.author = this.privacyPolicyForm.value.author;
                this.id = this.privacyPolicyForm.value.id;
                this.body = this.privacyPolicyForm.value.body;
                this.updatedAt = this.privacyPolicyForm.value.updatedAt;
            }
        });
    }


    onPrivacyPolicySubmit(privacyPolicyData) {
        if (this.privacyPolicyForm.valid) {
            this.privacyPolicyService.updatePrivacyPolicy(privacyPolicyData);
            this.privacyPolicyForm.reset();
        } else {
            this.sbAlert.open('Privacy Policy not Valid. Refresh and try again.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }

}
