import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from '../image/image.module';
import { SharedModule } from '../shared/shared.module';

import { CardRoutingModule } from './card-routing.module';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardNewComponent } from './components/card-new/card-new.component';
import { CardComponent } from './components/card.component';
import { CardService } from './services/card.service';

@NgModule({
    declarations: [
        CardComponent,
        CardEditComponent,
        CardItemComponent,
        CardListComponent,
        CardNewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardRoutingModule,
        ImageModule,
        SharedModule,
    ],
    providers: [
        CardService,
    ]
})
export class CardModule {}
