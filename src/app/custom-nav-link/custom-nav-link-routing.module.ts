import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CustomNavLinkEditComponent } from './components/custom-nav-link-edit/custom-nav-link-edit.component';
import { CustomNavLinkComponent } from './components/custom-nav-link.component';

const navLinkRoutes: Routes = [
    {
        path: 'custom-nav-links', component: CustomNavLinkComponent, children: [
            { path: '', component: CustomNavLinkEditComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(navLinkRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomNavLinkRoutingModule {}
