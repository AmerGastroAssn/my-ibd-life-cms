import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
        public sbAlert: MatSnackBar,
    ) {

    }

    ngOnInit(): void {
        // Get Ads
        this.adsService.getAd().subscribe((ads: Ads) => {
            if (ads !== null) {
                this.ads = ads;
                // Form:
                this.adsForm = this.fb.group({
                    id: [this.ads.id],
                    headerbar: [this.ads.headerbar],
                    skyscraper: [this.ads.skyscraper],
                    footerbar: [this.ads.footerbar],
                });

                this.id = this.adsForm.value.id;
                this.headerbar = this.adsForm.value.headerbar;
                this.skyscraper = this.adsForm.value.skyscraper;
                this.footerbar = this.adsForm.value.footerbar;
            }
        });
    }


    onAdsSubmit(adsData: Ads): void {
        if (adsData) {
            this.adsService.updateAds(adsData);
            this.adsForm.reset();
        } else {
            this.sbAlert.open('Error: No Ad data was available in the form', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error('agaERROR onAdsSubmit(): No Ad data was available in the form');
        }
    }
}
