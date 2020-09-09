import { Component, ElementRef, OnInit,
         OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ModalType } from 'src/app/constants/enums/modal-type';
import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import {UIAuthModalAction, UIUpdateLockAction, UpdateUserAction, UserLogOutAction} from 'src/app/actions/calData.action';
import { Subscription } from 'rxjs';
import { getAuthModalState, getUser } from '../../../selectors/selectors';
import { AuthCookieService } from '../../../services/auth/authCookie';
import { Constant } from '../../../constants/constant';
import { UserState } from '../../../constants/interfaces/user';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
    private uiAuthModalSub: Subscription;
    public hasLogin = false;
    public userName;

    public userIcon = faUser;

    constructor(private store: Store<reducerRoot.CalDataState>, private authTokenService: AuthCookieService) {
        this.loginFromCookie();
    }

    ngOnInit() {
        this.initSub();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.uiAuthModalSub.unsubscribe();
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

        this.uiAuthModalSub = this.store.select(getAuthModalState)
          .subscribe((open) => {
              if (this.accountModalShow) return;
              if (open) this.showModal(this.SIGN_IN);
        });
    }

    public showModal(tabString: string): void {
        this.activeTab(tabString);
        this.accountModalShow = true;
        this.store.dispatch(new UIUpdateLockAction({ full: false, scroll: true }));
        // This is to keep the state in sync when trigger locally,
        // it will make the local uiAuthModalSub going into infinity loop,
        // so it has to gard with a check if the accountModalShow is already true
        this.store.dispatch(new UIAuthModalAction(true));
    }

    public activeTab(tabString: string): void {
        this.activeTap = tabString;

        if (!this.tabs) return;
        this.tabs.forEach(item => {
            const eleClass = item.nativeElement.className;
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
        this.store.dispatch(new UIAuthModalAction(false));
    }

    public logOut(): void {
        this.store.dispatch(new UserLogOutAction());
    }

    public loginFromCookie(): void {
        const user: UserState = {
            id: this.authTokenService.getCookie(Constant.USER_ID_COOKIE),
            userName: this.authTokenService.getCookie(Constant.USER_NAME_COOKIE),
            email: this.authTokenService.getCookie(Constant.USER_EMAIL_COOKIE)
        };
        const token = this.authTokenService.getCookie(Constant.USER_ACCESS_TOKEN_COOKIE);
        if (user.id && user.userName && user.email && token) {
            this.store.dispatch(new UpdateUserAction(user));
        }
    }

}
