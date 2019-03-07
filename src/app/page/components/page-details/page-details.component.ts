import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { Category } from '../../../category/models/Category';
import { CategoryService } from '../../../category/services/category.service';
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
    category$: Observable<Category[]>;
    category: Category;
    categoryTitle: string;
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
        private categoryService: CategoryService,
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
        this.pageService.deletePage(this.page.id);
    }

}
