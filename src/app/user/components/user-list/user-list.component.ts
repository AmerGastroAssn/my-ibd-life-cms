import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../modals/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-admin-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(600)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class UserListComponent implements OnInit {
    users$: Observable<User[]>;
    user: User;
    authUser: Observable<User>;
    id: string;
    onlineDate: string;
    favicon = 'fa fa-users';
    sectionName = 'All Users';


    constructor(
        public userService: UserService,
        private route: ActivatedRoute,
        public authService: AuthService,
        public afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
        // this.onlineDate = this.afAuth.auth.currentUser.metadata.lastSignInTime;


        // this.authService.users$
        //     .subscribe((info) => {
        //         // this.onlineDate = info;
        //         console.log(info);
        //     });

        // Get id from url
        // this.id = this.route.snapshot.params['id'];
        // // Get each user's details
        // this.userService.getUser(this.id).subscribe((user) => {
        //     if (user) {
        //         this.user = user;
        //     }
        // });
    }


}
