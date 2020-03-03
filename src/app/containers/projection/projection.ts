import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-projection',
    templateUrl: './projection.html',
    styleUrls: ['./projection.scss']
})
export class ProjectionComponent implements OnInit, OnDestroy {

    private projectionId: number;
    private sub: Subscription;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.projectionId = params['id'];
            console.log(this.projectionId);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
