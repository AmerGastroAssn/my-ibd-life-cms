import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { first, map } from 'rxjs/operators';
import { User } from '../../user/modals/user';
import { UserService } from '../../user/services/user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    statusChange: any = new EventEmitter<any>();
    usersCollection: AngularFirestoreCollection<User>;
    usersList$: Observable<User[]>;
    currentUserId: string;
    user: User;
    afsUser$: Observable<firebase.User>;
    userDoc: AngularFirestoreDocument<User>;
    loggedIn: boolean;
    $key: string;
    uid: string;
    admin: boolean;
    displayName: string;
    email: string;
    password: string;
    photoURL: string;
    loginDate: number = Date.now();
    isOnline: boolean;
    title: string;
    isAdmin: boolean;


    constructor(
        private afAuth: AngularFireAuth,
        private flashMessage: FlashMessagesService,
        private router: Router,
        private route: ActivatedRoute,
        private afs: AngularFirestore,
        private userService: UserService,
        public sbAlert: MatSnackBar,
    ) {
        this.usersCollection = afs.collection<User>('users');
        this.usersList$ = this.usersCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(action => ({
                    $key: action.payload.doc.id, ...action.payload.doc.data()
                }));
            })
        );


        this.afsUser$ = afAuth.authState.do((user) => {
            if (user) {
                return this.currentUserId = user.uid;
            } else {
                return null;
            }
        });

        // Watches/Sets user in browser local storage.
        this.statusChange.subscribe(userData => {
            if (userData && this.afsUser$) {
                this.$key = userData.$key;
                this.uid = userData.uid;
                this.email = userData.email;
                this.title = userData.title;
                this.photoURL = userData.photoURL;
                this.loginDate = Date.now();
                this.isOnline = userData.isOnline;
                this.admin = userData.admin;
                this.displayName = userData.displayName;
            } else {
                this.displayName = null;
                this.email = null;
                this.uid = null;
                this.isOnline = false;
            }
        });
    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    // Used to get userData in browser memory.
    getProfile() {
        const user = localStorage.getItem('user');
        return JSON.parse(user);
    }

    // Checks if user is logged in.
    getAuth() {
        return this.afAuth.authState.pipe(
            map(auth => auth)
        );
    }

    // Checks if User is logged in, and if it's an admin
    async getAdminUserVals() {
        const loggedInUser = await this.isLoggedIn();
        if (loggedInUser) {
            this.usersList$.subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                        if (this.afAuth.auth.currentUser.email === userInfo.email) {
                            if (userInfo.admin) {
                                return userInfo;
                            } else {
                                console.log('Admin User not found');
                            }
                        }
                    }
                );
            });
        }
    }

    // Gets Firebase UserToken and stores in browser app storage.
    currentUserToken(): any {
        return this.afAuth.auth.currentUser.getIdToken(false)
                   .then(idToken => {
                       return localStorage.setItem('userToken', idToken);
                   })
                   .catch(error => {
                       return error;
                   });
    }


    // Sets the databaseUsers's info.
    setUserInLocalStorage(userData) {
        this.statusChange.emit(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    removeUserFromLocalStorage() {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
                .then((userData) => {
                    if (userData) {
                        this.usersList$.subscribe((userArr) => {
                            userArr.forEach((userInfo) => {
                                if (userData.user.email === userInfo.email) {
                                    this.setUserInLocalStorage(userInfo);
                                }
                            });
                        });
                    }
                    this.currentUserToken();
                })
                .then(() => {
                    this.sbAlert.open('Logged in successfully.', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate(['/users']);
                })
                .catch((error) => {
                    reject(error);
                    this.flashMessage.show(error, {
                        cssClass: 'alert-danger',
                        timeout: 5000
                    });
                    this.router.navigate(['/auth/login']);
                });
        });
    }

    emailSignup(userData) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
                   .then(user => {
                       // console.log('user', user);
                       return this.setUserData(userData, user); // create initial user document
                   })
                   .catch(error => {
                       this.router.navigate(['/auth/signup']);
                   });
    }


    logout() {
        this.afAuth.auth.signOut()
            .then(() => {
                this.removeUserFromLocalStorage();
                this.sbAlert.open('Logging you out.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-info']
                });
                this.router.navigate(['/auth/login']);
            })
            .catch((error) => {
                this.flashMessage.show(error, {
                    cssClass: 'alert-warning',
                    timeout: 3500
                });
                console.log(`ERROR~l: `, error);
            });

    }

    resetPassword(formData: any) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(formData.email)
                   .then(() => {
                       this.sbAlert.open('Email confirmation was sent to your email.', 'Dismiss', {
                           duration: 3000,
                           verticalPosition: 'bottom',
                           panelClass: ['snackbar-info']
                       });
                       console.log('Email confirmation was sent!');
                       this.router.navigate(['/auth/login']);
                   })
                   .catch((error) => {
                       this.sbAlert.open(error, 'Dismiss', {
                           duration: 3000,
                           verticalPosition: 'bottom',
                           panelClass: ['snackbar-danger']
                       });
                       console.log(error);
                   });
    }

    addUser(newUser: User) {
        return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                   .then((user) => {
                       this.setUserData(newUser, user)
                           .then(() => {
                               this.router.navigate([`/users`]);
                           })
                           .catch((error) => {
                               console.log(`ERROR~au: `, error);
                               this.sbAlert.open(error, 'Dismiss', {
                                   duration: 3000,
                                   verticalPosition: 'bottom',
                                   panelClass: ['snackbar-danger']
                               });
                           });
                   });
    }

    setUserToOffline(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            isOnline: false,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };


        return userRef.set(data)
                      .then(() => console.log('setUserToOffline set'))
                      .catch((error) => console.log(error));
    }

    setUserToOnline(user) {
        // Sets user data to firestore on login
        // console.log('user', user);
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            $key: user.uid,
            uid: user.uid,
            email: user.email,
            isOnline: true,
            loginDate: Date.now(),
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };

        userRef.set(data, { merge: true })
               .then()
               .catch((error) => console.log(error));
    }

    // Sets user but also in local storage.
    private setUserData(userData, info) {
        const user = info.user;
        console.log('userSet', user);
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            $key: user.uid,
            uid: user.uid,
            email: user.email,
            isOnline: true,
            loginDate: Date.now(),
            photoURL: userData.photoURL,
            admin: userData.admin || false,
            title: userData.title,
            displayName: userData.displayName,
        };
        this.setUserInLocalStorage(data);
        console.log('data', data);
        console.log('userRef', userRef);
        return userRef.set(data);
    }

}
