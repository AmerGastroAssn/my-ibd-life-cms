import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../modals/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    usersCollection: AngularFirestoreCollection<User>;
    userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;
    users$: Observable<User[]>;
    uid: string;
    authState: any;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        private afAuth: AngularFireAuth,
        private flashMessage: FlashMessagesService,
        public sbAlert: MatSnackBar,
    ) {
        this.usersCollection = this.afs.collection<User>('users');
    }

    getUsers(): Observable<User[]> {
        // Ref, and order by title
        this.usersCollection = this.afs.collection(`users`,
            ref => ref.orderBy('displayName', 'asc')
        );
        // Gets array of users along with their uid.
        return this.usersCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((arr) => {
                           const data = arr.payload.doc.data() as User;
                           data.uid = arr.payload.doc.id;
                           return data;
                       });
                   });
    }

    // If authenticated, return user-Key-ID/uid, else empty string.
    getUsersInfo() {
        return this.usersCollection.snapshotChanges().map(action => {
            return action.map(a => {
                if (a.payload.doc.exists === false) {
                    return null;
                } else {
                    const data = a.payload.doc.data() as User;
                    data.$key = a.payload.doc.id;
                    return data;
                }
            });
        });
    }


    getUser(id: string): Observable<User> {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        this.user = this.userDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as User;
                data.uid = action.payload.id;
                return data;
            }
        });

        return this.user;
    }

    updateUser(updatedUser, id: string): void {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        this.userDoc.update(updatedUser)
            .then((user) => {
                this.router.navigate([`/users/${id}`]);
                this.sbAlert.open('User was updated!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                console.log(`ERROR~au: `, error);
                this.flashMessage.show(`Something went wrong, user was not updated.`, {
                    cssClass: 'alert-danger',
                    timeout: 1500
                });
            });
    }

    deleteUser(id: string): void {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        if (confirm(`Are you sure you want to delete this user? This is irreversible.`)) {
            this.userDoc.delete()
                .then((user) => {
                    this.router.navigate([`/users`]);
                    this.sbAlert.open('User was Deleted!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .catch((error) => {
                    console.log(`ERROR~au: `, error);
                    this.flashMessage.show(`Something went wrong, user was not deleted.`, {
                        cssClass: 'alert-danger',
                        timeout: 1500
                    });
                });
        }
    }


}
