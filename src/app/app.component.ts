import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(300)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(0, style({ opacity: 0 })))
        ])
    ]

})
export class AppComponent {
    toggleSidenav: boolean;
    showDelay = new FormControl(1000);
    hideDelay = new FormControl(0);

    constructor(public authService: AuthService) {

    }

    onToggleSidenav() {
        this.toggleSidenav = !this.toggleSidenav;
        // $('button[mat-fab]').click(function () {
        //     $('#layout-sidenav').slideToggle('slow', function () {
        //         // Animation complete.
        //     });
        // });
    }

}
