import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarEditComponent } from './components/calendar-edit/admin-calendar-edit.component';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarNewComponent } from './components/calendar-new/calendar-new.component';
import { CalendarComponent } from './components/calendar.component';

import { CalendarService } from './services/calendar.service';

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarEditComponent,
        CalendarItemComponent,
        CalendarListComponent,
        CalendarNewComponent,
    ],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        CalendarService,
    ],
    exports: [

    ]
})
export class CalendarModule {}
