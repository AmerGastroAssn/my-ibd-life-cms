import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TextSection } from '../../../models/text-section';
import { TextSectionService } from '../../../services/text-section.service';

@Component({
    selector: 'app-text-section-detail',
    templateUrl: './text-section-detail.component.html',
    styleUrls: ['./text-section-detail.component.css']
})
export class TextSectionDetailComponent implements OnInit {
    textSection: TextSection;
    id: string;
    body: any;

    constructor(
      private route: ActivatedRoute,
      private textSectionService: TextSectionService,
      private sanitizer: DomSanitizer
    ) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.textSectionService.getTextSection(this.id)
            .subscribe((section) => {
                if (section) {
                    this.textSection = section;
                }
                if (section.body) {
                    this.body = this.sanitizer.bypassSecurityTrustHtml(section.body);
                }
            });
    }

}
