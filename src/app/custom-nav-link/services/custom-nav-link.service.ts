import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomLink } from '../models/custom-link';

@Injectable({
    providedIn: 'root'
})
export class CustomNavLinkService {
    customLinkDoc: AngularFirestoreDocument<CustomLink>;
    customLink$: Observable<CustomLink>;
    id: string;

    constructor(
        public sbAlert: MatSnackBar,
        private afs: AngularFirestore,
    ) {
        this.id = 'YdkVIUkeAxWpR6te6bEW';
    }

    getCustomLinks(): Observable<CustomLink> {
        this.customLinkDoc = this.afs.doc<CustomLink>(`customLinks/${this.id}`);
        this.customLink$ = this.customLinkDoc.snapshotChanges().pipe(
            map((action) => {
                if (action.payload.exists === false) {
                    return null;
                } else {
                    const data = action.payload.data() as CustomLink;
                    data.id = action.payload.id;
                    return data;
                }
            })
        );

        return this.customLink$;
    }


    updateCustomLink(updatedCustomLink): void {
        this.customLinkDoc = this.afs.doc<CustomLink>(`customLinks/${this.id}`);

        this.customLinkDoc.update(updatedCustomLink)
            .then(() => {
                this.sbAlert.open('Custom Links Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                this.sbAlert.open('Custom Links NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uCL: `, error);
            });
    }
}
