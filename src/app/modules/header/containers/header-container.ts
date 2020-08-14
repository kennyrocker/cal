import { Component, ElementRef, OnInit,
         OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ModalType } from 'src/app/constants/enums/modal-type';
import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import {UIUpdateLockAction, UserLogOutAction} from 'src/app/actions/calData.action';
import { Subscription } from 'rxjs';
import { getUser } from '../../../selectors/selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header-container.html',
    styleUrls: ['./header-container.scss']
})
export class HeaderContainerComponent implements OnInit, OnDestroy {

    public modalType = ModalType.PLAIN_TYPE;
    public accountModalShow = false;
    public SIGN_IN = 'signin';
    public SIGN_UP = 'signup';
    public activeTap: string;
    @ViewChildren('tab')
    public tabs: QueryList<ElementRef>;
    private userSub: Subscription;
    public hasLogin = false;
    public userName;


    constructor(private store: Store<reducerRoot.CalDataState>) {}

    ngOnInit() {
        this.initSub();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    private initSub(): void {
        this.userSub = this.store.select(getUser)
            .subscribe((user: any) => {
                if (user && user.id !== null) {
                    this.closeHandle();
                    this.hasLogin = true;
                    this.userName = user.userName;
                } else {
                    this.hasLogin = false;
                }
          });
    }

    public showModal(tabString: string): void {
        this.activeTab(tabString);
        this.accountModalShow = true;
        this.store.dispatch(new UIUpdateLockAction({ full: false, scroll: true }));
    }

    public activeTab(tabString: string): void {
        this.activeTap = tabString;

        if (!this.tabs) return;
        this.tabs.forEach(item => {
            let eleClass = item.nativeElement.className;
            if (eleClass.indexOf(tabString) !== -1) {
                if (eleClass.indexOf('tab-active') === -1) {
                    item.nativeElement.className = eleClass + ' tab-active';
                }
            } else {
                item.nativeElement.className = eleClass.replace('tab-active', '');
            }
        });
    }

    public closeHandle() {
        this.accountModalShow = false;
        this.store.dispatch(new UIUpdateLockAction({ full: false, scroll: false }));
    }

    public logOut(): void {
        this.store.dispatch(new UserLogOutAction());
    }

}
