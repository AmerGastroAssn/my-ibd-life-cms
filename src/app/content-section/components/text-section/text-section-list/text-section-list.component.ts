import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../user/modals/user';
import { TextSection } from '../../../models/text-section';
import { TextSectionService } from '../../../services/text-section.service';


@Component({
    selector: 'app-text-section-list',
    templateUrl: './text-section-list.component.html',
    styleUrls: ['./text-section-list.component.css'],
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
export class TextSectionListComponent implements OnInit {
    textSection$: Observable<TextSection[]>;
    textSectionList: any;
    textSection: TextSection;
    user: User;
    id: string;
    // Search
    searchTerm: string;
    startAt = new Subject();
    endAt = new Subject();
    startObs = this.startAt.asObservable();
    endObs = this.endAt.asObservable();
    lastKeyPress = 0;
    favicon = 'fa fa-align-justify';
    sectionName = 'Text Sections';

    constructor(
        private textSectionService: TextSectionService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.textSection$ = this.textSectionService.getAllTextSections();
        this.textSectionService.getAllTextSections()
            .subscribe((textSections) => this.textSectionList = textSections);
        Observable.combineLatest(this.startObs, this.endObs)
                  .subscribe((value) => {
                      this.textSectionService.getSearchedTextSections(value[0], value[1])
                          .subscribe((pages) => {
                              this.textSectionList = pages;
                          });
                  });


        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.textSectionService.getTextSection(this.id).subscribe((textSection) => {
            if (textSection !== null) {
                this.textSection = textSection;
            }
        });
    }


    search($event) {
        const query = $event.target.value.toLowerCase();
        if (query !== '') {
            this.startAt.next(query);
            this.endAt.next(`${query}\uf8ff`);
        } else {
            this.textSectionService.getAllTextSections()
                .subscribe((allTextSections) => this.textSectionList = allTextSections);
        }
    }

}
