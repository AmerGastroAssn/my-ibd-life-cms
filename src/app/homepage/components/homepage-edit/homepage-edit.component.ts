import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from '../../../auth/services/auth.service';
import { Category } from '../../../category/models/Category';
import { CategoryService } from '../../../category/services/category.service';
import { User } from '../../../user/modals/user';
import { Homepage } from '../../models/homepage';
import { CountdownService } from '../../services/countdown.service';
import { HomepageService } from '../../services/homepage.service';

@Component({
    selector: 'app-homepage-edit',
    templateUrl: './homepage-edit.component.html',
    styleUrls: ['./homepage-edit.component.css']
})
export class HomepageEditComponent implements OnInit {
    homePageForm: FormGroup;
    homePage: Homepage;
    author: User;
    id: string;
    sec1Title: string;
    sec1Subtitle: string;
    sec1ImageUrl: string;
    sec2TextLeft: string;
    sec2TextRight: string;
    sec3Title: string;
    sec3CardLeftTitle: string;
    sec3CardMiddleTitle: string;
    sec3CardRightTitle: string;
    sec3CardLeftImageUrl: string;
    sec3CardMiddleImageUrl: string;
    sec3CardRightImageUrl: string;
    sec3Subtitle: string;
    sec3Text: string;
    sec3CatLeft: string;
    sec3CatRight: string;
    sec4ImageUrl: string;
    sec4Title: string;
    sec4Text: string;
    updatedAt: Date | number;
    favicon: string;
    sectionName: string;
    category1: Category;
    category2: Category;

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
        private authService: AuthService,
        private catService: CategoryService,
    ) {
        this.favicon = 'fa fa-home';
        this.sectionName = 'Home Page';
        this.author = this.authService.getProfile();
    }

    ngOnInit(): void {

        // Home Form:
        this.homepageService.getHomepage().subscribe((homepage: Homepage): void => {
            if (homepage) {
                this.homePage = homepage;
                // Form:
                this.homePageForm = this.fb.group({
                    id: [this.homePage.id || ''],
                    sec1Title: [this.homePage.sec1Title || ''],
                    sec1Subtitle: [this.homePage.sec1Subtitle || ''],
                    sec1ImageUrl: [this.homePage.sec1ImageUrl || ''],
                    sec2TextLeft: [this.homePage.sec2TextLeft || ''],
                    sec2TextRight: [this.homePage.sec2TextRight || ''],
                    sec3Title: [this.homePage.sec3Title || ''],
                    sec3CardLeftTitle: [this.homePage.sec3CardLeftTitle || ''],
                    sec3CardMiddleTitle: [this.homePage.sec3CardMiddleTitle || ''],
                    sec3CardRightTitle: [this.homePage.sec3CardRightTitle || ''],
                    sec3CardLeftImageUrl: [this.homePage.sec3CardLeftImageUrl || ''],
                    sec3CardMiddleImageUrl: [this.homePage.sec3CardMiddleImageUrl || ''],
                    sec3CardRightImageUrl: [this.homePage.sec3CardRightImageUrl || ''],
                    sec3Subtitle: [this.homePage.sec3Subtitle || ''],
                    sec3Text: [this.homePage.sec3Text || ''],
                    sec3CatLeft: [this.homePage.sec3CatLeft || ''],
                    sec3CatRight: [this.homePage.sec3CatRight || ''],
                    sec4ImageUrl: [this.homePage.sec4ImageUrl || ''],
                    sec4Text: [this.homePage.sec4Text || ''],
                    sec4Title: [this.homePage.sec4Title || ''],
                    updatedAt: Date.now(),
                });

                this.id = this.homePageForm.value.id;
                this.sec1Title = this.homePageForm.value.sec1Title;
                this.sec1Subtitle = this.homePageForm.value.sec1Subtitle;
                this.sec1ImageUrl = this.homePageForm.value.sec1ImageUrl;
                this.sec2TextLeft = this.homePageForm.value.sec2TextLeft;
                this.sec2TextRight = this.homePageForm.value.sec2TextRight;
                this.sec3Title = this.homePageForm.value.sec3Title;
                this.sec3CardLeftTitle = this.homePageForm.value.sec3CardLeftTitle;
                this.sec3CardMiddleTitle = this.homePageForm.value.sec3CardMiddleTitle;
                this.sec3CardRightTitle = this.homePageForm.value.sec3CardRightTitle;
                this.sec3CardLeftImageUrl = this.homePageForm.value.sec3CardLeftImageUrl;
                this.sec3CardMiddleImageUrl = this.homePageForm.value.sec3CardMiddleImageUrl;
                this.sec3CardRightImageUrl = this.homePageForm.value.sec3CardRightImageUrl;
                this.sec3Subtitle = this.homePageForm.value.sec3Subtitle;
                this.sec3Text = this.homePageForm.value.sec3Text;
                this.sec3CatLeft = this.homePageForm.value.sec3CatLeft;
                this.sec3CatRight = this.homePageForm.value.sec3CatRight;
                this.sec4ImageUrl = this.homePageForm.value.sec4ImageUrl;
                this.sec4Title = this.homePageForm.value.sec4Title;
                this.sec4Text = this.homePageForm.value.sec4Text;
                this.updatedAt = this.homePageForm.value.updatedAt;

            }
        });

        this.catService.getTwoCategories().subscribe((cat: Category[]): any | Observable<null> => {
            if (cat) {
                this.category1 = cat[0];
                this.category2 = cat[1];
            } else {
                return of(null);
            }
        });

    }


    onHomePageSubmit(homePageFormData: Homepage): void {
        if (this.homePageForm.valid) {
            this.homepageService.updateHome(homePageFormData);
        } else {
            this.sbAlert.open('Home Page Form NOT valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }

}
