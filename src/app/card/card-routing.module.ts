import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardNewComponent } from './components/card-new/card-new.component';
import { CardComponent } from './components/card.component';

const cardRoutes: Routes = [
    {
        path: 'cards', component: CardComponent, children: [
            { path: '', component: CardListComponent },
            { path: 'new', component: CardNewComponent },
            { path: ':id/edit', component: CardEditComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(cardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CardRoutingModule {}
