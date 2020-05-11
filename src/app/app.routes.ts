import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectionContainerComponent } from 'src/app/modules/projection/containers/projection-container.component';
import { SnapshotContainerComponent } from 'src/app/modules/snapshot/containers/snapshot-container.component';
import { CompareContainerComponent } from './modules/compare/container/compare-container.component';
import { NotFoundComponent } from './modules/static/components/not-found/not-found-component';


const routes: Routes = [

    {
        path: 'snapshot',
        loadChildren: () => import('./modules/snapshot/app.snapshot.module').then(m => m.SnapshotModule),
        component: SnapshotContainerComponent,
        pathMatch: 'full'
    },
    {
        path: 'projection/:id',
        loadChildren: () => import('./modules/projection/app.projection.module').then(m => m.ProjectionModule),
        component: ProjectionContainerComponent,
        pathMatch: 'full'
    },
    {
        path: 'projection/new',
        loadChildren: () => import('./modules/projection/app.projection.module').then(m => m.ProjectionModule),
        component: ProjectionContainerComponent,
        pathMatch: 'full'
    },
    {
        path: 'compare/:ids',
        loadChildren: () => import('./modules/compare/app.compare.module').then(m => m.CompareModule),
        component: CompareContainerComponent,
        pathMatch: 'full'
    },
    {
        path: '404',
        component: NotFoundComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'snapshot',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [  
                RouterModule.forRoot(
                    routes,
                    { onSameUrlNavigation: 'ignore'}
                )
            ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
