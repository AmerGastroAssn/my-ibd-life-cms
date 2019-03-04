import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../user/modals/user';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.css'],
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
export class PageListComponent implements OnInit {
    page$: Observable<Page[]>;
    pageList: any;
    page: Page;
    user: User;
    uid: string;
    id: string;
    showListToggle = true;
    color = 'primary';
    searchTerm: string;
    startAt = new Subject();
    endAt = new Subject();
    startObs = this.startAt.asObservable();
    endObs = this.endAt.asObservable();
    lastKeyPress = 0;
    favicon = 'fa fa-layer-group';
    sectionName = 'Pages';

    constructor(
        private readonly pageService: PageService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.page$ = this.pageService.getPages();
        this.user = this.authService.getProfile();
        this.pageService.getAllPages()
            .subscribe((allImages) => this.pageList = allImages);
        Observable.combineLatest(this.startObs, this.endObs)
                  .subscribe((value) => {
                      this.pageService.getSearchedPages(value[0], value[1])
                          .subscribe((pages) => {
                              this.pageList = pages;
                          });
                  });


        // Get Page uid
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.pageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
            }
        });
    }

    toggleListCardView() {
        this.showListToggle = !this.showListToggle;
    }

    search($event) {
        const query = $event.target.value.toLowerCase();
        if (query !== '') {
            this.startAt.next(query);
            this.endAt.next(`${query}\uf8ff`);
        } else {
            this.pageService.getAllPages()
                .subscribe((allImages) => this.pageList = allImages);
        }
    }


}
