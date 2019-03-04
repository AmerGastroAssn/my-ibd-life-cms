import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileService } from '../file/services/file.service';
import { ImageService } from '../image/services/image.service';
import { SharedModule } from '../shared/shared.module';
import { AdsComponent } from './components/ads/ads.component';
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { MetaComponent } from './components/meta/meta.component';
import { ModalComponent } from './components/modal/modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CoreRoutingModule } from './core-routing.module';
import { AdsService } from './services/ads.service';
import { MetaService } from './services/meta.service';
import { ModalService } from './services/modal.service';
import { PrivacyPolicyService } from './services/privacy-policy.service';
import { SettingsService } from './services/settings.service';

@NgModule({
    declarations: [
        ModalComponent,
        AdsComponent,
        AnalyticsDashboardComponent,
        MetaComponent,
        SettingsComponent,
        PrivacyPolicyComponent,
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        SharedModule,
    ],
    providers: [
        AdsService,
        FileService,
        ImageService,
        MetaService,
        ModalService,
        SettingsService,
        PrivacyPolicyService,
    ],
    exports: [],

})
export class CoreModule {}
