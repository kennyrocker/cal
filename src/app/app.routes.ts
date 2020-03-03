
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProjectionComponent } from './containers/projection/projection';

const routes: Routes = [
    {
        path: 'projection/:id',
        component: ProjectionComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
