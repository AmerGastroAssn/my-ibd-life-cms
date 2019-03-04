import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CalendarEditComponent } from './components/calendar-edit/admin-calendar-edit.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarNewComponent } from './components/calendar-new/calendar-new.component';
import { CalendarComponent } from './components/calendar.component';

const calendarRoutes: Routes = [
    {
        path: 'calendar', component: CalendarComponent,
        children: [
            { path: '', component: CalendarListComponent },
            { path: 'new', component: CalendarNewComponent },
            { path: ':id/edit', component: CalendarEditComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(calendarRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class CalendarRoutingModule {}
