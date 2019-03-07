import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, PopoverModule, ProgressbarModule, TabsModule, TimepickerModule } from 'ngx-bootstrap';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../user/services/user.service';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { LogoWatermarkComponent } from './components/logo-watermark/logo-watermark.component';
import { MobileFooternavComponent } from './components/mobile-footernav/mobile-footernav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { RunScriptsDirective } from './directives/run-scripts.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HelperService } from './services/helper.service';

import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
    declarations: [
        MobileFooternavComponent,
        NavbarComponent,
        LogoWatermarkComponent,
        RunScriptsDirective,
        DropZoneDirective,
        SafeHtmlPipe,
        BottomSheetComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        BsDatepickerModule.forRoot(),
        FlashMessagesModule.forRoot(),
        PopoverModule.forRoot(),
        ProgressbarModule.forRoot(),
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        ProgressbarModule,
        PopoverModule,
        TabsModule,
        TimepickerModule,
        CKEditorModule,
        MatExpansionModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
    ],
    exports: [
        MobileFooternavComponent,
        NavbarComponent,
        BottomSheetComponent,
        LogoWatermarkComponent,
        RunScriptsDirective,
        DropZoneDirective,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        ProgressbarModule,
        BsDatepickerModule,
        PopoverModule,
        TabsModule,
        TimepickerModule,
        CKEditorModule,
        MatExpansionModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        SafeHtmlPipe,
        MatSnackBarModule,
    ],
    providers: [
        AuthService,
        UserService,
        HelperService,
    ],
    entryComponents: [
        BottomSheetComponent,
    ]
})
export class SharedModule {}
