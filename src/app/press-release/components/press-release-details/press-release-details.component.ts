import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PressRelease } from '../../models/press-release';
import { PressReleaseService } from '../../services/press-release.service';

@Component({
    selector: 'app-press-release-details',
    templateUrl: './press-release-details.component.html',
    styleUrls: ['./press-release-details.component.css'],
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
                animate(600, style({ opacity: 0 })))
        ])
    ]
})
export class PressReleaseDetailsComponent implements OnInit {
    id: string;
    pressRelease: PressRelease;
    url: string;
    body: any;

    constructor(
        private pressReleaseService: PressReleaseService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        // Get url/id
        this.url = this.route.snapshot.params['id'];
        // Get each user's details
        this.pressReleaseService.getPressRelease(this.url).subscribe((pressRelease) => {
            if (pressRelease !== null) {
                this.pressRelease = pressRelease;
                // Needed to sanitize the innerHTML
                this.body = this.sanitizer.bypassSecurityTrustHtml(pressRelease.body);
            }
        });

    }

    onDeletePressRelease() {
        this.pressReleaseService.deletePressRelease(this.url);
    }

}
