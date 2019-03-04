import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { PrivacyPolicy } from '../models/privacy-policy';

@Injectable({
    providedIn: 'root'
})
export class PrivacyPolicyService {
    privacyPolicyDoc: AngularFirestoreDocument<PrivacyPolicy>;
    privacyPolicy$: Observable<PrivacyPolicy>;
    id: string;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        private flashMessage: FlashMessagesService,
        public sbAlert: MatSnackBar,
    ) {
        this.id = 'tNHSskSp9M5xVny6xVeM';
    }

    getPrivacyPolicy(): Observable<PrivacyPolicy> {
        this.privacyPolicyDoc = this.afs.doc<PrivacyPolicy>(`privacyPolicy/${this.id}`);
        return this.privacyPolicy$ = this.privacyPolicyDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as PrivacyPolicy;
                data.id = action.payload.id;
                return data;
            }
        });
    }

    updatePrivacyPolicy(updatedPrivacyPolicy): void {
        this.privacyPolicyDoc = this.afs.doc<PrivacyPolicy>(`privacyPolicy/${this.id}`);

        this.privacyPolicyDoc.update(updatedPrivacyPolicy)
            .then(() => {
                this.sbAlert.open('Privacy Policy Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Privacy Policy updated', updatedPrivacyPolicy);
            })
            .catch((error) => {
                this.sbAlert.open('Privacy Policy was NOT Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uPP: `, error);
            });
    }
}
