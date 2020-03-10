import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CountdownService } from '../../../homepage/services/countdown.service';
import { HomepageService } from '../../../homepage/services/homepage.service';
import { Settings } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    favicon = 'fa fa-wrench';
    sectionName = `CMS Settings`;
    settingsForm: FormGroup;
    settings: Settings;
    allowSignup: boolean;
    allowSettings: boolean;
    disableAdmin: boolean;
    id: string;
    settingsAllowed: boolean; // Allow settings to be edited/viewed.
    dolphinCMSImage: string;


    constructor(
        public settingsService: SettingsService,
        private flashMessage: FlashMessagesService,
        private sbAlert: MatSnackBar,
        private fb: FormBuilder,
        private countdownService: CountdownService,
        private homepageService: HomepageService
    ) {
        // Settings
        this.settingsAllowed = this.settingsService.getAdminSettings().allowSettings;
        this.dolphinCMSImage = 'https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2020%2F1583362664573_dolphin-3d_260x260.png?alt=media&token=7931f5a2-0f12-4daa-8455-b8c212cd0fb5';

        // Settings Form
        this.settingsService.getSettings().subscribe((settingsData) => {
            if (settingsData !== null) {
                this.settings = settingsData;
                // Form:
                this.settingsForm = this.fb.group({
                    allowSignup: [this.settings.allowSignup || false],
                    allowSettings: [this.settings.allowSettings || false],
                    disableAdmin: [this.settings.disableAdmin || false],
                    id: [this.settings.id],
                });

                this.allowSignup = this.settingsForm.value.allowSignup;
                this.allowSettings = this.settingsForm.value.allowSettings;
                this.disableAdmin = this.settingsForm.value.disableAdmin;
                this.id = this.settingsForm.value.id;
            }
        });


    }

    ngOnInit() {
    }

    onSettingsSubmit(formData) {
        if (this.settingsForm.valid) {
            this.settingsService.updateSettings(formData);
        } else {
            this.sbAlert.open('Settings not Valid. Refresh and try again.', 'Dismiss', {
                duration: 3500,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }


}
