import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../user/modals/user';
import { PressRelease } from '../../models/press-release';
import { PressReleaseService } from '../../services/press-release.service';

@Component({
    selector: 'app-press-release-list',
    templateUrl: './press-release-list.component.html',
    styleUrls: ['./press-release-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class PressReleaseListComponent implements OnInit {
    pressRelease$: Observable<PressRelease[]>;
    pressReleaseList: Observable<PressRelease[]>;
    pressRelease: PressRelease;
    user: User;
    uid: string;
    id: string;
    color = 'primary';

    constructor(
        private readonly pressReleaseService: PressReleaseService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.pressRelease$ = this.pressReleaseService.getPressReleases();
        // Get User from local storage.
        this.user = this.authService.getProfile();
        this.pressReleaseList = this.pressReleaseService.getAllPressReleases();

        // Get PressRelease uid
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each Press Release's details
        this.pressReleaseService.getPressRelease(this.id).subscribe((pressRelease) => {
            if (pressRelease !== null) {
                this.pressRelease = pressRelease;
            }
        });
    }
}
