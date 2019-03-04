import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../modals/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-admin-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    id: string;
    user: User;
    uid: string;
    admin: boolean;
    email: string;
    localUser: User;
    isAdmin: boolean;
    adminUser: User;


    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.userService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
            }
        });

        this.localUser = this.authService.getProfile();

        // Is Admin?
        // this.userService.getUsersInfo()
        //     .subscribe((userArr: User[]) => {
        //         userArr.forEach((userInfo: User) => {
        //             if (this.afAuth.auth.currentUser.email === userInfo.email) {
        //                 if (userInfo.admin === true) {
        //                     // this.adminUser = userInfo;
        //                     this.isAdmin = true;
        //                 } else {
        //                     this.isAdmin = false;
        //                 }
        //             }
        //         });
        //     });
    }


    onDeleteUser() {
        this.userService.deleteUser(this.id);
    }


}
