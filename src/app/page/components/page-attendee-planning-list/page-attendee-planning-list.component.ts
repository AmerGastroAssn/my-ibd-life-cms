import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';


@Component({
    selector: 'app-page-attendee-planning-list',
    templateUrl: './page-attendee-planning-list.component.html',
    styleUrls: ['./page-attendee-planning-list.component.css']
})
export class PageAttendeePlanningListComponent implements OnInit {
    attPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.attPage$ = this.pageService.getAllAttendeePages();
    }
}
