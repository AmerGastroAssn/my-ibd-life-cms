import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';

// Inits the app (Fixes a bug).
firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,

    ],
    providers: [
        { provide: FirestoreSettingsToken, useValue: {} },
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [],
    entryComponents: []
})
export class AppModule {}
