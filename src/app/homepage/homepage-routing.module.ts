import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { HomepageEditComponent } from './components/homepage-edit/homepage-edit.component';
import { HomepageComponent } from './components/homepage.component';

const homepageRoutes: Routes = [
    {
        path: 'homepage', component: HomepageComponent, children: [
            { path: '', component: HomepageEditComponent }
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homepageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomepageRoutingModule {}
