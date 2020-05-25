import { Component, OnInit, OnDestroy } from "@angular/core";
import { Lock } from 'src/app/constants/interfaces/lock';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as reducerRoot from '../../reducers/index';
import { getUILock } from 'src/app/selectors/selectors';

@Component({
    selector: 'app-lock',
    styleUrls: ['./lock-container.scss'],
    templateUrl: './lock-container.html'
})
export class LockContainer implements OnInit, OnDestroy {

    public active: boolean;
    private lockSub: Subscription;

    constructor(private store: Store<reducerRoot.CalDataState>) {}

    ngOnInit() {
        this.lockSub = this.store.pipe(
                select(getUILock)
            ).subscribe(lock => {
                this.triggerLock(lock);
            });
    }

    ngOnDestroy() {
        this.lockSub.unsubscribe();
    }

    private triggerLock(lock: Lock): void {
        this.active = lock.full;
        lock.scroll ? this.disableScroll() : this.enableScroll();
    }

    private disableScroll(): void {
        if (window && window.document.body) {
            const bodyClass = window.document.body.className;
            if (bodyClass.indexOf('scroll-lock') !== -1) return;
            window.document.body.className = bodyClass + 'scroll-lock';   
        }
    }

    private enableScroll(): void {
        if (window && window.document.body) {
            const bodyClass = window.document.body.className;
            if (bodyClass.indexOf('scroll-lock') === -1) return;
            window.document.body.className = bodyClass.replace('scroll-lock', '');   
        }
    }

}