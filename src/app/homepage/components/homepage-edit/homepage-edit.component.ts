import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { BlogPost } from '../../../blog-post/models/blog-post';
import { BlogPostService } from '../../../blog-post/services/blog-post.service';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { CategoryService } from '../../../category/services/category.service';
import { Countdown } from '../../models/countdown';
import { DailyVideo } from '../../models/daily-video';
import { Homepage } from '../../models/homepage';
import { CountdownService } from '../../services/countdown.service';
import { HomepageService } from '../../services/homepage.service';

@Component({
    selector: 'app-homepage-edit',
    templateUrl: './homepage-edit.component.html',
    styleUrls: ['./homepage-edit.component.css']
})
export class HomepageEditComponent implements OnInit {
    id: string;
    // Countdown
    countdownForm: FormGroup;
    countdown: Countdown;
    date: any;
    bsConfig: Partial<BsDatepickerConfig>;
    // DDW Daily Video Form
    dailyVideoForm: FormGroup;
    dailyVideo: DailyVideo;
    videoURL: string;
    // Sections Form
    homePageForm: FormGroup;
    homePage: Homepage;
    title: string;
    subtitle: string;
    forTime: string;
    subheaderLoc: string;
    subheaderDate: string;
    cardsTitle: string;
    cardsSubtitle: string;
    cardsHidden: boolean;
    videoTitle: string;
    videoSubtitle: string;
    videoHidden: boolean;
    postsTitle: string;
    postsSubtitle: string;
    postsButtonText: string;
    postsButtonURL: string;
    postsHidden: boolean;
    onDemandTitle: string;
    onDemandText: string;
    onDemandButtonText: string;
    onDemandButtonURL: string;
    onDemandHidden: boolean;
    byTheNumbersTitle: string;
    byTheNumbersOneNumber: string;
    byTheNumbersOneSubtitle: string;
    byTheNumbersTwoNumber: string;
    byTheNumbersTwoSubtitle: string;
    byTheNumbersThreeNumber: string;
    byTheNumbersThreeSubtitle: string;
    byTheNumbersHidden: boolean;
    sponsorTitle: string;
    sponsorOneImg: string;
    sponsorOneURL: string;
    sponsorTwoImg: string;
    sponsorTwoURL: string;
    sponsorThreeImg: string;
    sponsorThreeURL: string;
    sponsorFourImg: string;
    sponsorFourURL: string;
    sponsorHidden: boolean;
    hasCategory: boolean;
    categoryTitle: string;
    categorySectionTitle: string;
    bannerButtonText: string;
    bannerButtonURL: string;
    hasBannerButton: boolean;
    bannerButtonIsExtUrl: boolean;
    cards$: Observable<Card[]>;
    cardOption1: string;
    cardOption2: string;
    cardOption3: string;
    posts$: Observable<BlogPost[]>;
    postOption1: string;
    postOption2: string;
    postOption3: string;
    favicon: string;
    sectionName: string;

    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id,rel];*(*);*{*}',
    };

    constructor(
        private flashMessage: FlashMessagesService,
        private sbAlert: MatSnackBar,
        private fb: FormBuilder,
        private countdownService: CountdownService,
        private homepageService: HomepageService,
        private categoryService: CategoryService,
        private cardService: CardService,
        private postService: BlogPostService,
    ) {
        this.favicon = 'fa fa-home';
        this.sectionName = 'Home Page';
        // Get Countdown
        this.countdownService.getCountdownDetails().subscribe((countdown: Countdown) => {
            if (countdown) {
                this.countdown = countdown;
                // Form:
                this.countdownForm = this.fb.group({
                    date: [this.countdown.date],
                    id: [this.countdown.id],
                });

                this.date = this.countdownForm.value.date;
                this.id = this.countdownForm.value.id;
            }
        });

        // Datepicker Config
        this.bsConfig = Object.assign({},
            {
                containerClass: 'theme-default',
                dateInputFormat: 'MMMM Do YYYY,h:mm:ss a'
            });

        // Video URL
        this.homepageService.getVideoURL().subscribe((url) => {
            if (url !== null) {
                this.dailyVideo = url;
                // Form:
                this.dailyVideoForm = this.fb.group({
                    id: [this.dailyVideo.id],
                    videoURL: [this.dailyVideo.videoURL],
                });
                this.id = this.dailyVideoForm.value.id;
                this.videoURL = this.dailyVideoForm.value.videoURL;
            }
        });

        // Home Form:
        this.homepageService.getHomepage().subscribe((homepage: Homepage) => {
            if (homepage) {
                this.homePage = homepage;
                // Form:
                this.homePageForm = this.fb.group({
                    id: [this.homePage.id],
                    title: [this.homePage.title],
                    subtitle: [this.homePage.subtitle],
                    forTime: [this.homePage.forTime],
                    subheaderLoc: [this.homePage.subheaderLoc],
                    subheaderDate: [this.homePage.subheaderDate],
                    cardsTitle: [this.homePage.cardsTitle],
                    cardsSubtitle: [this.homePage.cardsSubtitle],
                    cardsHidden: [this.homePage.cardsHidden],
                    videoTitle: [this.homePage.videoTitle],
                    videoSubtitle: [this.homePage.videoSubtitle],
                    videoHidden: [this.homePage.videoHidden],
                    postsTitle: [this.homePage.postsTitle],
                    postsSubtitle: [this.homePage.postsSubtitle],
                    postsButtonText: [this.homePage.postsButtonText],
                    postsButtonURL: [this.homePage.postsButtonURL],
                    postOption1: [this.homePage.postOption1],
                    postOption2: [this.homePage.postOption2],
                    postOption3: [this.homePage.postOption3],
                    postsHidden: [this.homePage.postsHidden],
                    onDemandTitle: [this.homePage.onDemandTitle],
                    onDemandText: [this.homePage.onDemandText],
                    onDemandButtonText: [this.homePage.onDemandButtonText],
                    onDemandButtonURL: [this.homePage.onDemandButtonURL],
                    onDemandHidden: [this.homePage.onDemandHidden],
                    byTheNumbersTitle: [this.homePage.byTheNumbersTitle],
                    byTheNumbersOneNumber: [this.homePage.byTheNumbersOneNumber],
                    byTheNumbersOneSubtitle: [this.homePage.byTheNumbersOneSubtitle],
                    byTheNumbersTwoNumber: [this.homePage.byTheNumbersTwoNumber],
                    byTheNumbersTwoSubtitle: [this.homePage.byTheNumbersTwoSubtitle],
                    byTheNumbersThreeNumber: [this.homePage.byTheNumbersThreeNumber],
                    byTheNumbersThreeSubtitle: [this.homePage.byTheNumbersThreeSubtitle],
                    byTheNumbersHidden: [this.homePage.byTheNumbersHidden],
                    sponsorTitle: [this.homePage.sponsorTitle],
                    sponsorOneImg: [this.homePage.sponsorOneImg],
                    sponsorOneURL: [this.homePage.sponsorOneURL],
                    sponsorTwoImg: [this.homePage.sponsorTwoImg],
                    sponsorTwoURL: [this.homePage.sponsorTwoURL],
                    sponsorThreeImg: [this.homePage.sponsorThreeImg],
                    sponsorThreeURL: [this.homePage.sponsorThreeURL],
                    sponsorFourImg: [this.homePage.sponsorFourImg],
                    sponsorFourURL: [this.homePage.sponsorFourURL],
                    sponsorHidden: [this.homePage.sponsorHidden],
                    bannerButtonText: [this.homePage.bannerButtonText],
                    bannerButtonURL: [this.homePage.bannerButtonURL],
                    hasBannerButton: [this.homePage.hasBannerButton],
                    bannerButtonIsExtUrl: [this.homePage.bannerButtonIsExtUrl],
                    cardOption1: [this.homePage.cardOption1],
                    cardOption2: [this.homePage.cardOption2],
                    cardOption3: [this.homePage.cardOption3],
                });

                this.id = this.homePageForm.value.id;
                this.title = this.homePageForm.value.title;
                this.subtitle = this.homePageForm.value.subtitle;
                this.forTime = this.homePageForm.value.forTime;
                this.subheaderLoc = this.homePageForm.value.subheaderLoc;
                this.subheaderDate = this.homePageForm.value.subheaderDate;
                this.cardsTitle = this.homePageForm.value.cardsTitle;
                this.cardsSubtitle = this.homePageForm.value.cardsSubtitle;
                this.cardsHidden = this.homePageForm.value.cardsHidden;
                this.videoTitle = this.homePageForm.value.videoTitle;
                this.videoSubtitle = this.homePageForm.value.videoSubtitle;
                this.videoHidden = this.homePageForm.value.videoHidden;
                this.postsTitle = this.homePageForm.value.postsTitle;
                this.postsSubtitle = this.homePageForm.value.postsSubtitle;
                this.postsButtonText = this.homePageForm.value.postsButtonText;
                this.postsButtonURL = this.homePageForm.value.postsButtonURL;
                this.postOption1 = this.homePageForm.value.postOption1;
                this.postOption2 = this.homePageForm.value.postOption2;
                this.postOption3 = this.homePageForm.value.postOption3;
                this.postsHidden = this.homePageForm.value.postsHidden;
                this.onDemandTitle = this.homePageForm.value.onDemandTitle;
                this.onDemandText = this.homePageForm.value.onDemandText;
                this.onDemandButtonText = this.homePageForm.value.onDemandButtonText;
                this.onDemandButtonURL = this.homePageForm.value.onDemandButtonURL;
                this.onDemandHidden = this.homePageForm.value.onDemandHidden;
                this.byTheNumbersTitle = this.homePageForm.value.byTheNumbersTitle;
                this.byTheNumbersOneNumber = this.homePageForm.value.byTheNumbersOneNumber;
                this.byTheNumbersOneSubtitle = this.homePageForm.value.byTheNumbersOneSubtitle;
                this.byTheNumbersTwoNumber = this.homePageForm.value.byTheNumbersTwoNumber;
                this.byTheNumbersTwoSubtitle = this.homePageForm.value.byTheNumbersTwoSubtitle;
                this.byTheNumbersThreeNumber = this.homePageForm.value.byTheNumbersThreeNumber;
                this.byTheNumbersThreeSubtitle = this.homePageForm.value.byTheNumbersThreeSubtitle;
                this.byTheNumbersHidden = this.homePageForm.value.byTheNumbersHidden;
                this.sponsorTitle = this.homePageForm.value.sponsorTitle;
                this.sponsorOneImg = this.homePageForm.value.sponsorOneImg;
                this.sponsorOneURL = this.homePageForm.value.sponsorOneURL;
                this.sponsorTwoImg = this.homePageForm.value.sponsorTwoImg;
                this.sponsorTwoURL = this.homePageForm.value.sponsorTwoURL;
                this.sponsorThreeImg = this.homePageForm.value.sponsorThreeImg;
                this.sponsorThreeURL = this.homePageForm.value.sponsorThreeURL;
                this.sponsorFourImg = this.homePageForm.value.sponsorFourImg;
                this.sponsorFourURL = this.homePageForm.value.sponsorFourURL;
                this.sponsorHidden = this.homePageForm.value.sponsorHidden;
                this.bannerButtonText = this.homePageForm.value.bannerButtonText;
                this.bannerButtonURL = this.homePageForm.value.bannerButtonURL;
                this.hasBannerButton = this.homePageForm.value.hasBannerButton;
                this.bannerButtonIsExtUrl = this.homePageForm.value.bannerButtonIsExtUrl;
                this.cardOption1 = this.homePageForm.value.cardOption1;
                this.cardOption2 = this.homePageForm.value.cardOption2;
                this.cardOption3 = this.homePageForm.value.cardOption3;
            }
        });
    }

    ngOnInit() {
        this.cards$ = this.cardService.getAllCards();
        this.posts$ = this.postService.getAllPosts();
    }


    onCountdownSubmit(cdFormData: Countdown) {
        this.countdownService.updateCountdown(cdFormData);
    }

    onDailyVideoSubmit(videoForm: DailyVideo) {
        this.homepageService.updateVideoURL(videoForm);
    }

    onHomePageSubmit(homePageFormData: Homepage) {
        this.homepageService.updateHomeForm(homePageFormData);
    }

    toggleHasCategory() {
        // this.homePage.hasCategory = !this.homePage.hasCategory;
    }

    toggleCardsHidden() {
        this.homePage.cardsHidden = !this.homePage.cardsHidden;
    }

    toggleVideoHidden() {
        this.homePage.videoHidden = !this.homePage.videoHidden;
    }

    togglePostsHidden() {
        this.homePage.postsHidden = !this.homePage.postsHidden;
    }

    toggleOnDemandHidden() {
        this.homePage.onDemandHidden = !this.homePage.onDemandHidden;
    }

    toggleByTheNumbersHidden() {
        this.homePage.byTheNumbersHidden = !this.homePage.byTheNumbersHidden;
    }

    toggleSponsorHidden() {
        this.homePage.sponsorHidden = !this.homePage.sponsorHidden;
    }

    toggleHasBannerButton() {
        this.homePage.hasBannerButton = !this.homePage.hasBannerButton;
    }

    toggleBannerButtonIsExtURL() {
        this.homePage.bannerButtonIsExtUrl = !this.homePage.bannerButtonIsExtUrl;
    }

}
