import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../modals/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users$: Observable<User[]>;
    localUser: User;
    adminUser: any;
    isAdmin: boolean;

    constructor(public userService: UserService,
                private authService: AuthService,
                private afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.getAdminUserVals();
        this.users$ = this.userService.getUsers();
        this.localUser = this.authService.getProfile();
    }

    async getAdminUserVals() {
        const loggedInUser = await this.authService.isLoggedIn();
        if (loggedInUser) {
            this.authService.usersList$.subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                        if (this.afAuth.auth.currentUser.email === userInfo.email) {
                            if (userInfo.admin) {
                                this.adminUser = userInfo;
                                console.log(userInfo);
                                this.isAdmin = true;
                            } else {
                                this.isAdmin = false;
                                // console.log(this.isAdmin);
                            }
                        }
                    }
                );
            });
        }
    }


}
