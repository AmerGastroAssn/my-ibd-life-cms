import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CallToAction } from '../../../models/call-to-action';
import { CallToActionService } from '../../../services/call-to-action.service';

@Component({
    selector: 'app-call-to-action-detail',
    templateUrl: './call-to-action-detail.component.html',
    styleUrls: ['./call-to-action-detail.component.css']
})
export class CallToActionDetailComponent implements OnInit {
    cta: CallToAction;
    id: string;
    body: any;
    videoUrl: any;
    imageUrl: any;
    logo: string;


    constructor(
        private ctaService: CallToActionService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        this.id = this.route.snapshot.params['id'];
        this.logo = 'https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2019%2F1551821167531_my_ibd_life_logo_grey_250.png?alt=media&token=14b5d8ae-2a1a-4794-a479-f0d66103f8b1';
    }

    ngOnInit() {
        this.ctaService.getCta(this.id).subscribe((cta: CallToAction): void => {
            if (cta) {
                if (cta.imageUrl) {
                    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.imageUrl);
                }
                if (cta.videoUrl) {
                    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.videoUrl);
                }
                if (cta.body) {
                    this.body = this.sanitizer.bypassSecurityTrustHtml(cta.body);
                }
            }
        });
    }

}
