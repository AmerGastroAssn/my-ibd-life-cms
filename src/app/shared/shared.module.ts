import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule, ProgressbarModule, TabsModule, TimepickerModule } from 'ngx-bootstrap';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../user/services/user.service';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { LogoWatermarkComponent } from './components/logo-watermark/logo-watermark.component';
import { MobileFooternavComponent } from './components/mobile-footernav/mobile-footernav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { RunScriptsDirective } from './directives/run-scripts.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TrustUrlPipe } from './pipes/trust-url.pipe';
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
        SafePipe,
        TrustUrlPipe,
        BottomSheetComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FlashMessagesModule.forRoot(),
        PopoverModule.forRoot(),
        ProgressbarModule.forRoot(),
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
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
        SafePipe,
        TrustUrlPipe,
        MatSnackBarModule,
        BrowserAnimationsModule,
        BsDatepickerModule,
    ],
    providers: [
        AuthService,
        UserService,
        HelperService,
    ],
    entryComponents: [
        // BottomSheetComponent,
    ]
})
export class SharedModule {}
