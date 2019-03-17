import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/services/auth.service';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { Category } from '../../../category/models/Category';
import { CategoryService } from '../../../category/services/category.service';
import { CallToAction } from '../../../content-section/models/call-to-action';
import { TextSection } from '../../../content-section/models/text-section';
import { CallToActionService } from '../../../content-section/services/call-to-action.service';
import { TextSectionService } from '../../../content-section/services/text-section.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-new',
    templateUrl: './page-new.component.html',
    styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit, OnDestroy {
    newPageForm: FormGroup;
    user: User;
    page: Page;
    pages$: Observable<Page[]>;
    title: string;
    author: string;
    date: number;
    photoURL: string;
    bannerPhotoURL: string;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    url: string;
    extURL: string;
    isExtURL: boolean;
    sortOrder: number;
    hasCategory: boolean;
    categoryTitle: string;
    category$: Observable<Category[]>;
    disableAdminOnNew: boolean;
    metaDesc: string;
    hasCards: boolean;
    cardOption1: string;
    cardOption2: string;
    cardOption3: string;
    cardSectionTitle: string;
    textSections$: Observable<TextSection[]>;
    cta$: Observable<CallToAction[]>;
    contentSectionTop: string;
    contentSectionBottom: string;
    callToAction: string;
    pageCards$: Observable<Card[]>;
    isHovering: boolean;
    isInvalid: boolean;
    value: any;
    bsConfig: Partial<BsDatepickerConfig>;
    isExtURLPage: boolean;
    currentDate: Date;
    showWidgetSnippet: boolean;
    // Form Grandchildren pages
    isGrandchildPage: boolean;
    grandchildURL: string;
    hidden: boolean;
    registerPages$: Observable<Page[]>;
    newsPages$: Observable<Page[]>;
    exhibitPages$: Observable<Page[]>;
    edPages$: Observable<Page[]>;
    attendeePages$: Observable<Page[]>;
    presPages$: Observable<Page[]>;
    invalidTitle: EventEmitter<boolean> = new EventEmitter();
    titleNotValid: boolean;

    CkeditorConfig = {
        allowedContent: true,
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private authService: AuthService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private categoryService: CategoryService,
        private cardService: CardService,
        private textSectionService: TextSectionService,
        private ctaService: CallToActionService,
    ) {
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            }
        });

        this.uid = this.afs.createId();
        this.user = this.authService.getProfile();
        this.currentDate = new Date();

        // Datepicker Config
        this.bsConfig = Object.assign({},
            {
                containerClass: 'theme-default',
                dateInputFormat: 'MMMM Do YYYY,h:mm a',
                placeholder: this.currentDate,
            });
    }

    // For Form Validations
    get f() {
        return this.newPageForm.controls;
    }

    ngOnInit() {
        // Gets Page Categories for Grandchild page selection.
        // this.registerPages$ = this.pageService.getAllRegisterPages();
        // this.newsPages$ = this.pageService.getAllNewsPages();
        // this.exhibitPages$ = this.pageService.getAllExhibitorPages();
        // this.edPages$ = this.pageService.getAllEducationPages();
        // this.attendeePages$ = this.pageService.getAllAttendeePages();
        // this.presPages$ = this.pageService.getAllPresenterPages();

        // Get Category Titles
        // this.category$ = this.categoryService.getAllCategorys();
        // Page Cards:
        // this.pageCards$ = this.cardService.getAllCards();
        // this.pages$ = this.pageService.getAllPages();

        // Content Sections:
        this.textSections$ = this.textSectionService.getAllTextSections();
        this.cta$ = this.ctaService.getAllCtas();

        // Form:
        this.newPageForm = this.fb.group({

            title: ['', Validators.required],
            body: [''],
            author: ['' || this.author],
            date: ['' || this.currentDate, Validators.required],
            photoURL: [''],
            bannerPhotoURL: ['' || 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg'],
            category: ['', Validators.required],
            published: ['' || false],
            template: ['' || 'Full Width'],
            url: [''],
            extURL: [''],
            isExtURL: ['' || false],
            sortOrder: ['' || 1],
            hasCategory: [''],
            categoryTitle: [''],
            isGrandchildPage: ['' || false],
            grandchildURL: [''],
            hidden: ['' || false],
            metaDesc: ['', Validators.required],
            hasCards: ['' || false],
            cardOption1: [''],
            cardOption2: [''],
            cardOption3: [''],
            cardSectionTitle: [''],
            contentSectionTop: [''],
            contentSectionBottom: [''],
            callToAction: [''],
            showWidgetSnippet: ['' || false],
        });

        this.title = this.newPageForm.value.title;
        this.body = this.newPageForm.value.body;
        this.author = this.newPageForm.value.author;
        this.date = this.newPageForm.value.date;
        this.photoURL = this.newPageForm.value.photoURL;
        this.bannerPhotoURL = this.newPageForm.value.bannerPhotoURL;
        this.category = this.newPageForm.value.category;
        this.published = this.newPageForm.value.published;
        this.template = this.newPageForm.value.template;
        this.extURL = this.newPageForm.value.extURL;
        this.isExtURL = this.newPageForm.value.isExtURL;
        this.sortOrder = this.newPageForm.value.sortOrder;
        this.hasCategory = this.newPageForm.value.hasCategory;
        this.categoryTitle = this.newPageForm.value.categoryTitle;
        this.isGrandchildPage = this.newPageForm.value.isGrandchildPage;
        this.grandchildURL = this.newPageForm.value.grandchildURL;
        this.hidden = this.newPageForm.value.hidden;
        this.metaDesc = this.newPageForm.value.metaDesc;
        this.hasCards = this.newPageForm.value.hasCards;
        this.cardOption1 = this.newPageForm.value.cardOption1;
        this.cardOption2 = this.newPageForm.value.cardOption2;
        this.cardOption3 = this.newPageForm.value.cardOption3;
        this.cardSectionTitle = this.newPageForm.value.cardSectionTitle;
        this.contentSectionTop = this.newPageForm.value.contentSectionTop;
        this.contentSectionBottom = this.newPageForm.value.contentSectionBottom;
        this.callToAction = this.newPageForm.value.callToAction;
        this.showWidgetSnippet = this.newPageForm.value.showWidgetSnippet;
    }

    ngOnDestroy() {

    }

    onAddNewPage(formData) {
        if (!this.newPageForm.valid) {
            this.sbAlert.open('Missing at least one input, page was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.pageService.setPage(formData)
                .then(() => {
                    this.newPageForm.reset();
                    this.sbAlert.open('New Page created!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .catch((error) => console.log(error));
        }
    }

    isExtURLToggle() {
        this.isExtURL = !this.isExtURL;
    }

    // toggleHasCategory() {
    //     this.hasCategory = !this.hasCategory;
    // }
    //
    // toggleIsGrandchildPage() {
    //     this.isGrandchildPage = !this.isGrandchildPage;
    // }
    //
    // toggleHasCards() {
    //     this.hasCards = !this.hasCards;
    // }


}
