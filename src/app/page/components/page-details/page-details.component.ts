import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Calendar } from '../../../calendar/models/Calendar';
import { CalendarService } from '../../../calendar/services/calendar.service';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { CallToAction } from '../../../content-section/models/call-to-action';
import { TextSection } from '../../../content-section/models/text-section';
import { CallToActionService } from '../../../content-section/services/call-to-action.service';
import { TextSectionService } from '../../../content-section/services/text-section.service';
import { MetaService } from '../../../core/services/meta.service';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';


@Component({
    selector: 'app-page-details',
    templateUrl: './page-details.component.html',
    styleUrls: ['./page-details.component.css'],
})
export class PageDetailsComponent implements OnInit, AfterContentInit {
    id: string;
    page: Page;
    uid: string;
    calendar$: Observable<Calendar[]>;
    calendar: Calendar;
    calendarTitle: string;
    pageCard1: Card;
    pageCard2: Card;
    pageCard3: Card;
    month: string;
    month2: string;
    month3: string;
    month4: string;
    // Content Sections
    cta: CallToAction;
    contentSectionTop: TextSection;
    contentSectionBottom: TextSection;
    videoUrl: any;
    imageUrl: any;
    ctaBody: any;
    tsTopBody: any;
    tsBottomBody: any;
    widgetSnippet: any;
    ingoImage = `https://firebasestorage.googleapis.com/v0/b/ddw-org-dev.appspot.com/o/images%2F2019%2F1549405081565_ingo_image.png?alt=media&token=7032f2c2-d1c2-4dc5-922d-851a74baeb3a`;

    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private cardService: CardService,
        private calendarService: CalendarService,
        private ctaService: CallToActionService,
        private tsService: TextSectionService,
        private sanitizer: DomSanitizer,
        private metaService: MetaService,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];


        // Get each user's details
        this.pageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;

                this.metaService.getMeta()
                    .subscribe((meta) => {
                        if (this.page && meta) {
                            // Widget Snippet
                            this.widgetSnippet = meta.widgetSnippet;
                            console.log('this.widgetsnippet', this.widgetSnippet);
                        }
                    });

                // Calendar
                if (this.page.hasCalendar) {
                    this.calendar$ = this.calendarService.getCalendarByTitle(this.page.calendarTitle);

                    this.calendar$.subscribe((calendar) => {
                        this.calendar = calendar[0];
                        // console.log(`this.calendar`, this.calendar);
                        // Date 1
                        if (this.calendar.date1) {
                            const date1AsString = this.calendar.date1.toDate().toDateString();
                            if (date1AsString.includes('Jan')) {
                                this.month = 'Jan.';
                            } else if (date1AsString.includes('Feb')) {
                                this.month = 'Feb.';
                            } else if (date1AsString.includes('Mar')) {
                                this.month = 'March';
                            } else if (date1AsString.includes('Apr')) {
                                this.month = 'April';
                            } else if (date1AsString.includes('May')) {
                                this.month = 'May';
                            } else if (date1AsString.includes('Jun')) {
                                this.month = 'June';
                            } else if (date1AsString.includes('Jul')) {
                                this.month = 'July';
                            } else if (date1AsString.includes('Aug')) {
                                this.month = 'Aug.';
                            } else if (date1AsString.includes('Sep')) {
                                this.month = 'Sep.';
                            } else if (date1AsString.includes('Oct')) {
                                this.month = 'Oct.';
                            } else if (date1AsString.includes('Nov')) {
                                this.month = 'Nov.';
                            } else if (date1AsString.includes('Dec')) {
                                this.month = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 2
                        if (this.calendar.date2) {
                            const date2AsString = this.calendar.date2.toDate().toDateString();
                            if (date2AsString.includes('Jan')) {
                                this.month2 = 'Jan.';
                            } else if (date2AsString.includes('Feb')) {
                                this.month2 = 'Feb.';
                            } else if (date2AsString.includes('Mar')) {
                                this.month2 = 'March';
                            } else if (date2AsString.includes('Apr')) {
                                this.month2 = 'April';
                            } else if (date2AsString.includes('May')) {
                                this.month2 = 'May';
                            } else if (date2AsString.includes('Jun')) {
                                this.month2 = 'June';
                            } else if (date2AsString.includes('Jul')) {
                                this.month2 = 'July';
                            } else if (date2AsString.includes('Aug')) {
                                this.month2 = 'Aug.';
                            } else if (date2AsString.includes('Sep')) {
                                this.month2 = 'Sep.';
                            } else if (date2AsString.includes('Oct')) {
                                this.month2 = 'Oct.';
                            } else if (date2AsString.includes('Nov')) {
                                this.month2 = 'Nov.';
                            } else if (date2AsString.includes('Dec')) {
                                this.month2 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 3
                        if (this.calendar.date3) {
                            const date3AsString = this.calendar.date3.toDate().toDateString();
                            if (date3AsString.includes('Jan')) {
                                this.month3 = 'Jan.';
                            } else if (date3AsString.includes('Feb')) {
                                this.month3 = 'Feb.';
                            } else if (date3AsString.includes('Mar')) {
                                this.month3 = 'March';
                            } else if (date3AsString.includes('Apr')) {
                                this.month3 = 'April';
                            } else if (date3AsString.includes('May')) {
                                this.month3 = 'May';
                            } else if (date3AsString.includes('Jun')) {
                                this.month3 = 'June';
                            } else if (date3AsString.includes('Jul')) {
                                this.month3 = 'July';
                            } else if (date3AsString.includes('Aug')) {
                                this.month3 = 'Aug.';
                            } else if (date3AsString.includes('Sep')) {
                                this.month3 = 'Sep.';
                            } else if (date3AsString.includes('Oct')) {
                                this.month3 = 'Oct.';
                            } else if (date3AsString.includes('Nov')) {
                                this.month3 = 'Nov.';
                            } else if (date3AsString.includes('Dec')) {
                                this.month3 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 4
                        if (this.calendar.date4) {
                            const date4AsString = this.calendar.date4.toDate().toDateString();
                            if (date4AsString.includes('Jan')) {
                                this.month4 = 'Jan.';
                            } else if (date4AsString.includes('Feb')) {
                                this.month4 = 'Feb.';
                            } else if (date4AsString.includes('Mar')) {
                                this.month4 = 'March';
                            } else if (date4AsString.includes('Apr')) {
                                this.month4 = 'April';
                            } else if (date4AsString.includes('May')) {
                                this.month4 = 'May';
                            } else if (date4AsString.includes('Jun')) {
                                this.month4 = 'June';
                            } else if (date4AsString.includes('Jul')) {
                                this.month4 = 'July';
                            } else if (date4AsString.includes('Aug')) {
                                this.month4 = 'Aug.';
                            } else if (date4AsString.includes('Sep')) {
                                this.month4 = 'Sep.';
                            } else if (date4AsString.includes('Oct')) {
                                this.month4 = 'Oct.';
                            } else if (date4AsString.includes('Nov')) {
                                this.month4 = 'Nov.';
                            } else if (date4AsString.includes('Dec')) {
                                this.month4 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }
                    });
                }

                // Page Cards:
                if (this.page.hasCards) {
                    this.cardService.getPageCard(this.page.cardOption1)
                        .subscribe((card) => {
                            this.pageCard1 = card;
                        });
                    this.cardService.getPageCard(this.page.cardOption2)
                        .subscribe((card) => {
                            this.pageCard2 = card;
                        });
                    this.cardService.getPageCard(this.page.cardOption3)
                        .subscribe((card) => {
                            this.pageCard3 = card;
                        });
                }


                // Content Sections
                if (this.page.contentSectionTop) {
                    this.tsService.getTextSection(this.page.contentSectionTop)
                        .subscribe((section) => {
                            if (section.body) {
                                this.tsTopBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                            }
                        });
                }
                if (this.page.contentSectionBottom) {
                    this.tsService.getTextSection(this.page.contentSectionBottom)
                        .subscribe((section) => {
                            if (section.body) {
                                this.tsBottomBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                            }
                        });
                }
                if (this.page.callToAction) {
                    this.ctaService.getCta(this.page.callToAction)
                        .subscribe((cta) => {
                            this.cta = cta;
                            if (cta.imageUrl) {
                                this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.imageUrl);
                            }
                            if (cta.videoUrl) {
                                this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.videoUrl);
                            }
                            if (cta.body) {
                                this.ctaBody = this.sanitizer.bypassSecurityTrustHtml(cta.body);
                            }
                        });
                }
            }

        }); // END
    }

    ngAfterContentInit(): void {
    }

    onDeletePage() {
        this.pageService.deletePage(this.page.uid);
    }

}
