
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectionContainerComponent } from 'src/app/modules/projection/containers/projection-container.component';


const routes: Routes = [
    {
        path: 'projection/:id',
        loadChildren: () => import('./modules/projection/app.projection.module').then(m => m.ProjectionModule),
        component: ProjectionContainerComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
