import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap';
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
import { ImageService } from '../../../image/services/image.service';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-edit',
    templateUrl: './page-edit.component.html',
    styleUrls: ['./page-edit.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(600)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class PageEditComponent implements OnInit {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
    page: Page;
    editPageForm: FormGroup;
    title: string;
    author: string;
    date: any;
    photoURL: any;
    bannerPhotoURL: any;
    category: string;
    id: string;
    published: boolean;
    template: string;
    url: string;
    extURL: string;
    isExtURL: boolean;
    isExtURLPage: boolean;
    sortOrder: number;
    hasCategory: boolean;
    categoryTitle: string;
    categorys$: Observable<Category[]>;
    categorys: Category[];
    disableAdminOnEdit: boolean;
    metaDesc: string;
    hasCards: boolean;
    cardOption1: string;
    cardOption2: string;
    cardOption3: string;
    cardSectionTitle: string;
    pageCards$: Observable<Card[]>;
    textSections$: Observable<TextSection[]>;
    cta$: Observable<CallToAction[]>;
    contentSectionTop: string;
    contentSectionBottom: string;
    callToAction: string;
    showWidgetSnippet: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;
    togglePagePreview = false;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;
    isNewsCategory: boolean;
    // Form Grandchildren pages
    isGrandchildPage: boolean;
    grandchildURL: string;
    hidden: boolean;
    pages$: Observable<Page[]>;
    // Content Sections
    cta: CallToAction;
    videoUrl: any;
    previewVideoUrl: any;
    imageUrl: any;
    previewImageUrl: any;
    ctaBody: any;
    previewCtaBody: any;
    tsTopBody: any;
    tsTopValue: string;
    tsBottomBody: any;
    tsBottomValue: string;
    hideTSPreview: boolean;
    hideCTAPreview: boolean;
    textSectionPreviews$: Observable<TextSection[]>;
    textSectionPreview: TextSection;
    ctaPreview: CallToAction;
    ctaPreviews$: Observable<CallToAction[]>;
    // Cards:
    pageCard1: Card;
    pageCard2: Card;
    pageCard3: Card;

    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private storage: AngularFireStorage,
        private sbAlert: MatSnackBar,
        private sanitizer: DomSanitizer,
        private authService: AuthService,
        private categoryService: CategoryService,
        private cardService: CardService,
        private imageService: ImageService,
        private textSectionService: TextSectionService,
        private ctaService: CallToActionService,
        private tsService: TextSectionService,
    ) {

        // Datepicker Config
        this.bsConfig = Object.assign({},
            {
                containerClass: 'theme-default',
                dateInputFormat: 'MMMM Do YYYY,h:mm',
                placeholder: new Date()
            });

        // Get Current Author
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {

            }
        });
    }

    // For Form Validations
    get f() {
        return this.editPageForm.controls;
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        this.pageCards$ = this.cardService.getAllCards();
        // this.categorys$ = this.categoryService.getAllCategorys();
        this.textSections$ = this.textSectionService.getAllTextSections();
        this.textSectionPreviews$ = this.textSectionService.getAllTextSections();
        this.cta$ = this.ctaService.getAllCtas();
        this.ctaPreviews$ = this.ctaService.getAllCtas();

        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get Page
        this.pageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
                const newURL: string = this.pageService.string_to_slug(page.title);

                // Form:
                this.editPageForm = this.fb.group({
                    id: [this.page.id],
                    title: [this.page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    author: [this.page.author],
                    date: [this.page.date || ''],
                    bannerPhotoURL: [this.page.bannerPhotoURL || ''],
                    photoURL: [this.page.photoURL || ''],
                    category: [this.page.category, Validators.required],
                    published: [this.page.published || false],
                    template: [this.page.template],
                    url: [newURL, Validators.required],
                    extURL: [this.page.extURL],
                    isExtURL: [this.page.isExtURL],
                    sortOrder: [this.page.sortOrder],
                    // hasCategory: [this.page.hasCategory],
                    // categoryTitle: [this.page.categoryTitle],
                    isGrandchildPage: [this.page.isGrandchildPage],
                    grandchildURL: [this.page.grandchildURL],
                    hidden: [this.page.hidden || false],
                    metaDesc: [this.page.metaDesc || ''],
                    hasCards: [this.page.hasCards || false],
                    cardOption1: [this.page.cardOption1],
                    cardOption2: [this.page.cardOption2],
                    cardOption3: [this.page.cardOption3],
                    cardSectionTitle: [this.page.cardSectionTitle],
                    contentSectionTop: [this.page.contentSectionTop || ''],
                    contentSectionBottom: [this.page.contentSectionBottom || ''],
                    callToAction: [this.page.callToAction || ''],
                    showWidgetSnippet: [this.page.showWidgetSnippet || false],
                });

                this.id = this.editPageForm.value.id;
                this.title = this.editPageForm.value.title;
                this.author = this.editPageForm.value.author;
                this.date = this.editPageForm.value.date.valueOf();
                this.bannerPhotoURL = this.editPageForm.value.bannerPhotoURL;
                this.photoURL = this.editPageForm.value.photoURL;
                this.category = this.editPageForm.value.category;
                this.published = this.editPageForm.value.published;
                this.template = this.editPageForm.value.template;
                this.url = this.editPageForm.value.url;
                this.extURL = this.editPageForm.value.extURL;
                this.isExtURL = this.editPageForm.value.isExtURL;
                this.sortOrder = this.editPageForm.value.sortOrder;
                // this.hasCategory = this.editPageForm.value.hasCategory;
                // this.categoryTitle = this.editPageForm.value.categoryTitle;
                this.isGrandchildPage = this.editPageForm.value.isGrandchildPage;
                this.grandchildURL = this.editPageForm.value.grandchildURL;
                this.hidden = this.editPageForm.value.hidden;
                this.metaDesc = this.editPageForm.value.metaDesc;
                this.hasCards = this.editPageForm.value.hasCards;
                this.cardOption1 = this.editPageForm.value.cardOption1;
                this.cardOption2 = this.editPageForm.value.cardOption2;
                this.cardOption3 = this.editPageForm.value.cardOption3;
                this.cardSectionTitle = this.editPageForm.value.cardSectionTitle;
                this.contentSectionTop = this.editPageForm.value.contentSectionTop;
                this.contentSectionBottom = this.editPageForm.value.contentSectionBottom;
                this.callToAction = this.editPageForm.value.callToAction;
                this.showWidgetSnippet = this.editPageForm.value.showWidgetSnippet;


                // Content Sections
                if (this.page.contentSectionTop !== '') {
                    this.tsService.getTextSection(this.page.contentSectionTop)
                        .subscribe((section) => {
                            if (section) {
                                this.tsTopBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                                this.tsTopValue = section.value;
                            }
                        });
                }

                if (this.page.contentSectionBottom) {
                    this.tsService.getTextSection(this.page.contentSectionBottom)
                        .subscribe((section) => {
                            if (section) {
                                this.tsBottomBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                                this.tsBottomValue = section.value;
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


            } // END this.page

        });


    }

    onUpdatePage(formData) {
        if (!this.editPageForm.valid) {
            this.sbAlert.open('Something went wrong, Page was not created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.pageService.updatePage(formData);
            this.editPageForm.reset(this.editPageForm);
            this.sbAlert.open('Page was updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

    // @HostListener('window:scroll')
    // onScrollEvent() {
    //     if ('window:scroll') {
    //         this.datepicker.hide();
    //     }
    // }


    onTogglePagePreview() {
        this.togglePagePreview = !this.togglePagePreview;
    }


    onTsPreview(id: string): void {
        this.textSectionService.getTextSection(id).subscribe((ts) => {
            if (ts) {
                this.textSectionPreview = ts;
                this.hideTSPreview = false;
            }
        });
    }

    onCTAPreview(id: string): void {
        this.ctaService.getCta(id).subscribe((cta) => {
            if (cta) {
                this.ctaPreview = cta;
                this.hideCTAPreview = false;

                if (cta.imageUrl) {
                    this.previewImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.imageUrl);
                }
                if (cta.videoUrl) {
                    this.previewVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.videoUrl);
                }
                if (cta.body) {
                    this.previewCtaBody = this.sanitizer.bypassSecurityTrustHtml(cta.body);
                }
            }
        });
    }

    onHideTSPreview(): void {
        this.hideTSPreview = true;
    }

    onHideCTAPreview(): void {
        this.hideCTAPreview = true;
    }


}
