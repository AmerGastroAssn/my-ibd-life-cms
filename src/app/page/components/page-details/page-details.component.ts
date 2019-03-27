import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallToAction } from '../../../content-section/models/call-to-action';
import { TextSection } from '../../../content-section/models/text-section';
import { CallToActionService } from '../../../content-section/services/call-to-action.service';
import { TextSectionService } from '../../../content-section/services/text-section.service';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';


@Component({
    selector: 'app-page-details',
    templateUrl: './page-details.component.html',
    styleUrls: ['./page-details.component.css'],
})
export class PageDetailsComponent implements OnInit {
    page: Page;
    url: string;
    isIBDRelationships: boolean;
    cta: CallToAction;
    textSectionTop: TextSection;
    textSectionBottom: TextSection;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private tsService: TextSectionService,
        private ctaService: CallToActionService,
    ) {
        this.url = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.pageService.getPage(this.url).subscribe((page: Page) => {
            if (page) {
                this.page = page;
                this.isIBDRelationships = page.category === 'ibd-relationships';
                if (page.contentSectionTop) {
                    this.tsService.getTextSection(page.contentSectionTop)
                        .subscribe((ts: TextSection) => {
                            if (ts) {
                                this.textSectionTop = ts;
                            }
                        });
                }
                if (page.contentSectionBottom) {
                    this.tsService.getTextSection(page.contentSectionBottom)
                        .subscribe((ts: TextSection) => {
                            if (ts) {
                                this.textSectionBottom = ts;
                            }
                        });
                }
                if (page.callToAction) {
                    this.ctaService.getCta(page.callToAction)
                        .subscribe((cta: CallToAction) => {
                            if (cta) {
                                this.cta = cta;
                            }
                        });
                }
            }
        });
    }

    onDeletePage(): void {
        this.pageService.deletePage(this.url);
    }

}
