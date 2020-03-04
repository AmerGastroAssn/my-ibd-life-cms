import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../user/modals/user';
import { TextSection } from '../models/text-section';


@Injectable({
    providedIn: 'root'
})
export class TextSectionService {
    textSectionCollection: AngularFirestoreCollection<TextSection>;
    textSectionDoc: AngularFirestoreDocument<TextSection>;
    textSection$: Observable<TextSection>;
    currentUser: User;
    currentDate: number = Date.now();

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        private sbAlert: MatSnackBar,
        private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
        this.currentDate = Date.now();
    }

    stringToSlug = (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';
        for (let i = 0, l = from.length; i < l; i += 1) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                 .replace(/\s+/g, '-') // collapse whitespace and replace by -
                 .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    getAllTextSections(): Observable<TextSection[]> {
        this.textSectionCollection = this.afs.collection<TextSection>('textSections', (ref) => {
            return ref.orderBy('value', 'asc');
        });
        return this.textSectionCollection.valueChanges();
    }


    getTextSections(): Observable<TextSection[]> {
        // Ref, and order by title
        this.textSectionCollection = this.afs.collection(`textSections`,
            ref => ref.orderBy('value', 'asc')
        );
        // Gets array of textSections along with their uid.
        return this.textSectionCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as TextSection;
                           data.id = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getTextSection(id: string): Observable<TextSection> {
        this.textSectionDoc = this.afs.doc<TextSection>(`textSections/${id}`);
        this.textSection$ = this.textSectionDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as TextSection;
                data.id = action.payload.id;
                // console.log('data in getTextSection()', data);
                return data;
            }
        });

        return this.textSection$;
    }


    getSearchedTextSections(start, end) {
        return this.afs.collection('textSections',
            (ref) => ref.orderBy('value')
                        .startAt(start).endAt(end)
        )
                   .valueChanges();
    }

    setTextSection(formData): Promise<void> {
        const nameToUrl = this.stringToSlug(formData.name);
        const newId = this.afs.createId();
        const textSectionRef: AngularFirestoreDocument<TextSection> = this.afs.doc(`textSections/${newId}`);

        const data: TextSection = {
            author: this.currentUser,
            body: formData.body,
            createdAt: this.currentDate,
            id: newId,
            name: formData.name,
            updatedAt: this.currentDate,
            published: formData.published || false,
            value: nameToUrl,
        };

        console.log('data', data);
        return textSectionRef.set(data, { merge: true })
                             .then(() => {
                                 this.router.navigate(['/text-section']);
                                 this.sbAlert.open('Text Section created', 'Dismiss', {
                                     duration: 3000,
                                     verticalPosition: 'bottom',
                                     panelClass: ['snackbar-success']
                                 });
                                 console.log('Text Section created', data);
                             })
                             .catch((error) => console.log(`ERROR~sTextSection: `, error));
    }

    updateTextSection(formData): Promise<void> {
        const nameToUrl = this.stringToSlug(formData.name);
        const textSectionRef: AngularFirestoreDocument<TextSection> = this.afs.doc(`textSections/${formData.id}`);

        const data: TextSection = {
            author: this.currentUser,
            body: formData.body,
            createdAt: formData.createdAt,
            id: formData.id,
            name: formData.name,
            updatedAt: Date.now(),
            published: formData.published || false,
            value: nameToUrl,
        };

        console.log('data', data);
        return textSectionRef.set(data)
                             .then(() => {
                                 this.router.navigate(['/text-section']);
                                 this.sbAlert.open('Text Section updated', 'Dismiss', {
                                     duration: 3000,
                                     verticalPosition: 'bottom',
                                     panelClass: ['snackbar-success']
                                 });
                                 console.log('Text Section updated', data);
                             })
                             .catch((error) => console.log(`ERROR~uTextSection: `, error));
    }
}
