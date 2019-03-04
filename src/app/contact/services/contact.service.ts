import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactCollection: AngularFirestoreCollection<Contact>;
    contactDoc: AngularFirestoreDocument<Contact>;
    contact: Observable<Contact>;
    contacts$: Observable<Contact[]>;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        public sbAlert: MatSnackBar,
    ) {
    }

    getAllContacts(sortValue): Observable<Contact[]> {
        // Ref, and order by title
        console.log('sortValue', sortValue);
        this.contactCollection = this.afs.collection(`contactForm`,
            ref => ref.orderBy(sortValue, 'asc')
        );
        // Gets array of pressReleases along with their uid.
        return this.contactCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as Contact;
                           data.$key = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getAllUnviewedContacts(): Observable<Contact[]> {
        this.contactCollection = this.afs.collection(`contactForm`,
            ref => ref.where('viewed', '==', false)
        );
        // Gets array of pressReleases along with their uid.
        return this.contactCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as Contact;
                           data.uid = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getContact(id: string): Observable<Contact> {
        this.contactDoc = this.afs.doc<Contact>(`contactForm/${id}`);
        this.contact = this.contactDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Contact;
                data.uid = action.payload.id;
                console.log('data in getContact', data);
                return data;
            }
        });

        return this.contact;
    }


    setContact(formData) {
        // Creates new pressRelease with slug as the $key
        const new$key = this.afs.createId();
        const contactRef: AngularFirestoreDocument<Contact> = this.afs.doc(`contactForm/${new$key}`);

        const data: Contact = {
            $key: new$key,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            subject: formData.subject,
            body: formData.body,
            sentDate: Date.now(),
            viewed: formData.viewed || false,
            uid: new$key,
        };

        return contactRef.set(data);
    }

    deleteContact(id: string): void {
        this.contactDoc = this.afs.doc<Contact>(`contactForm/${id}`);
        if (confirm(`Are you sure you want to delete this Contact? This is irreversible.`)) {
            this.contactDoc.delete()
                .then(() => {
                    this.sbAlert.open('Contact Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate([`/contacts`]);
                })
                .catch((error) => {
                    this.sbAlert.open('Something went wrong, Contact not Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                    console.log(`ERROR~dC: `, error);
                });
        }
    }

    setViewedContact(id) {
        this.afs.doc(`contactForm/${id}`).set({
            viewed: true
        }, { merge: true })
            .then(() => {
                this.sbAlert.open('Contact marked as Viewed', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                this.sbAlert.open('Something went wrong, Contact not updated', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log('Error~sVC:', error);
            });
    }

    setUnviewedContact(id) {
        this.afs.doc(`contactForm/${id}`).set({
            viewed: false
        }, { merge: true })
            .then(() => {
                this.sbAlert.open('Contact Un-viewed', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                this.sbAlert.open('Something went wrong, Contact not updated', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log('Error~sVC:', error);
            });
    }
}
