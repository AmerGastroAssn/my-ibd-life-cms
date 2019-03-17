import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { DailyVideo } from '../models/daily-video';
import { Homepage } from '../models/homepage';

@Injectable({
    providedIn: 'root'
})
export class HomepageService {
    videoDoc: AngularFirestoreDocument<DailyVideo>;
    video$: Observable<DailyVideo>;
    videoId: string;
    homeDoc: AngularFirestoreDocument<Homepage>;
    home$: Observable<Homepage>;
    id: string;

    constructor(
        private sbAlert: MatSnackBar,
        private afs: AngularFirestore,
    ) {
        this.videoId = 'TsCwvT2a4VolBZrvTbOS';
        this.id = 'iaid7gh0P4Zjqw8dL9CU';
    }


    getHomepage(): Observable<Homepage> {
        this.homeDoc = this.afs.doc<Homepage>(`homePage/${this.id}`);
        this.home$ = this.homeDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Homepage;
                data.id = action.payload.id;
                return data;
            }
        });

        return this.home$;
    }

    updateHome(formData: Homepage): void {
        this.homeDoc = this.afs.doc<Homepage>(`homePage/${this.id}`);

        this.homeDoc.update(formData)
            .then(() => {
                this.sbAlert.open('Home Page Form Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Video URL updated', formData);
            })
            .catch((error) => {
                this.sbAlert.open('Home Page Form NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uHF: `, error);
            });
    }
}
