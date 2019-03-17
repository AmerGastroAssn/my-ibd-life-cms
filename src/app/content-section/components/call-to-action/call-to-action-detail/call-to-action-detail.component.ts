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


    constructor(
      private ctaService: CallToActionService,
      private router: Router,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer
    ) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.ctaService.getCta(this.id).subscribe((cta) => {
            this.cta = cta;
            if (cta.imageUrl) {
                this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.imageUrl);
            }
            if (cta.videoUrl) {
                this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.videoUrl);
            }
            if (cta.body) {
                this.body = this.sanitizer.bypassSecurityTrustHtml(cta.body);
            }
        });
    }

}
