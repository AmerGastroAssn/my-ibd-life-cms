import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Card } from '../models/card';


@Injectable({
    providedIn: 'root'
})
export class CardService {
    pageCardCollection: AngularFirestoreCollection<Card>;
    pageCardDoc: AngularFirestoreDocument<Card>;
    pageCard$: Observable<Card>;
    pageCards$: Observable<Card[]>;
    loggedInUser: string;
    uid: string;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        public sbAlert: MatSnackBar,
        private authService: AuthService,
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
            } else {
                return of(null);
            }
        });
    }

    getAllCards(): Observable<Card[]> {
        this.pageCardCollection = this.afs.collection<Card>('pageCards', (ref) => {
            return ref.orderBy('title', 'asc');
        });
        return this.pageCardCollection.valueChanges();
    }

    getCardsByTitle(title: string): Observable<Card[]> {
        this.pageCardCollection = this.afs.collection<Card>('pageCards', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.pageCardCollection.valueChanges();
    }

    getPageCard(key: string): Observable<Card> {
        this.pageCardDoc = this.afs.doc<Card>(`pageCards/${key}`);
        this.pageCard$ = this.pageCardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.pageCard$;
    }


    updatePageCard(formData, id): void {
        const cardRef: AngularFirestoreDocument<Card> = this.afs.doc(`pageCards/${id}`);
        const data: Card = {
            $key: id,
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            id: id,
            updatedAt: Date.now(),
            author: this.loggedInUser,
            isExtURL: formData.isExtURL
        };

        cardRef.set(data, { merge: true })
               .then(() => {
                   this.router.navigate(['/cards']);
                   this.sbAlert.open('Page Card Updated!', 'Dismiss', {
                       duration: 3000,
                       verticalPosition: 'bottom',
                       panelClass: ['snackbar-success']
                   });
               })
               .catch((error) => {
                   this.sbAlert.open(error, 'Dismiss', {
                       duration: 3000,
                       verticalPosition: 'bottom',
                       panelClass: ['snackbar-danger']
                   });
                   console.error(`ERROR~uPC: `, error);
               });
    }

    setPageCard(formData): Promise<void> {
        const newId = this.afs.createId();
        const calRef: AngularFirestoreDocument<Card> = this.afs.doc(`pageCards/${newId}`);

        const data: Card = {
            $key: newId,
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            id: newId,
            updatedAt: Date.now(),
            author: this.loggedInUser,
            isExtURL: formData.isExtURL
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/cards']);
                         this.sbAlert.open('Page Card Created!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Page Card Created!', data);
                     })
                     .catch((error) => console.log(`ERROR~sPC: `, error));
    }

    deletePageCard(id: string, title: string): void {
        this.pageCardDoc = this.afs.doc<Card>(`pageCards/${id}`);
        if (confirm(`Are you sure you want to delete (${title})? This is irreversible.`)) {
            this.pageCardDoc.delete()
                .then(() => {
                    this.sbAlert.open('Card Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate([`/cards`]);
                })
                .catch((error) => {
                    this.sbAlert.open('Something went wrong, Card not Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                    console.log(`ERROR~dPC: `, error);
                });
        }
    }


}
