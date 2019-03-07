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
    cards$: Observable<Card[]>;
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
        this.pageCardCollection = this.afs.collection<Card>('cards', (ref) => {
            return ref.orderBy('title', 'asc');
        });
        return this.pageCardCollection.valueChanges();
    }

    getCardsByTitle(title: string): Observable<Card[]> {
        this.pageCardCollection = this.afs.collection<Card>('cards', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.pageCardCollection.valueChanges();
    }

    getPageCard(id: string): Observable<Card> {
        this.pageCardDoc = this.afs.doc<Card>(`cards/${id}`);
        this.pageCard$ = this.pageCardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.id = action.payload.id;
                return data;
            }
        });
        return this.pageCard$;
    }


    updatePageCard(formData, id): void {
        const cardRef: AngularFirestoreDocument<Card> = this.afs.doc(`cards/${id}`);
        const data: Card = {
            author: this.uid,
            id: id,
            imageUrl: formData.imageUrl,
            isExtUrl: formData.isExtUrl || false,
            url: formData.url,
            orderNumber: formData.orderNumber || 0,
            title: formData.title,
            updatedAt: Date.now(),
        };

        cardRef.set(data, { merge: true })
               .then(() => {
                   this.router.navigate(['/cards']);
                   this.sbAlert.open('Rebate Card Updated!', 'Dismiss', {
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
        const calRef: AngularFirestoreDocument<Card> = this.afs.doc(`cards/${newId}`);

        const data: Card = {
            author: this.uid,
            id: newId,
            imageUrl: formData.imageUrl,
            isExtUrl: formData.isExtUrl || false,
            url: formData.url,
            orderNumber: formData.orderNumber || 0,
            title: formData.title,
            updatedAt: Date.now(),
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/cards']);
                         this.sbAlert.open('Rebate Card Created!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                     })
                     .catch((error) => console.error(`ERROR~sPC: `, error));
    }

    deletePageCard(id: string, title: string): void {
        this.pageCardDoc = this.afs.doc<Card>(`cards/${id}`);
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
                    console.error(`ERROR~dPC: `, error);
                });
        }
    }


}
