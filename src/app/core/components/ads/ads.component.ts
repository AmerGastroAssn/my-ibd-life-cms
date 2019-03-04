import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ads } from '../../models/ad';
import { AdsService } from '../../services/ads.service';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
    adsForm: FormGroup;
    ads: Ads;
    id: string;
    headerbar: string;
    skyscraper: string;
    footerbar: string;
    favicon = 'fa fa-money-bill-wave';
    sectionName = 'Ad Scripts';


    constructor(
        private adsService: AdsService,
        private fb: FormBuilder,
        private flashMessage: FlashMessagesService,
    ) {

    }

    ngOnInit() {
        // Get Ads
        this.adsService.getAd().subscribe((ads: Ads) => {
            if (ads !== null) {
                this.ads = ads;
                // Form:
                this.adsForm = this.fb.group({
                    id: [this.adsService.id],
                    headerbar: [this.headerbar],
                    skyscraper: [this.skyscraper],
                    footerbar: [this.footerbar],
                });

                this.id = this.adsForm.value.id;
                this.headerbar = this.adsForm.value.headerbar;
                this.skyscraper = this.adsForm.value.skyscraper;
                this.footerbar = this.adsForm.value.footerbar;
            }
        });
    }


    onAdsSubmit(adsData: Ads) {
        this.adsService.updateAds(adsData);
        this.adsForm.reset();
    }
}
