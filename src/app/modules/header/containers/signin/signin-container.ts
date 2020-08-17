import {Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {ActionsSubject, Store} from '@ngrx/store';
import * as reducerRoot from '../../../../reducers';
import { CalDataActionTypes, PostUserLoginAction } from '../../../../actions/calData.action';
import { ofType } from '@ngrx/effects';
import { HttpStatus } from '../../../../constants/enums/http-status';
import { Constant } from '../../../../constants/constant';

@Component({
    selector: 'app-signin',
    templateUrl: './signin-container.html',
    styleUrls: ['./signin-container.scss']
})
export class SigninContainer implements OnInit, OnDestroy, OnChanges {

    @Input('show')
    public show: boolean;
    public signinForm: FormGroup;
    private emailChangeSub: Subscription;
    private emailChangeSubject = new Subject<any>();
    private passwordChangeSub: Subscription;
    private passwordChangeSubject = new Subject<any>();
    private signInFailedSubject = new Subject<any>();
    public signInError = false;

    constructor(
        private actionsSubject: ActionsSubject,
        private store: Store<reducerRoot.CalDataState>) {
        this.initSignInSub();
    }

    ngOnInit() {
        this.initForm();
        this.initSub();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.show) {
            this.initForm();
        }
    }

  public bindEmailChangeSubject(value): void {
        this.emailChangeSubject.next(value);
      }

    public bindPasswordChangeSubject(value): void {
        this.passwordChangeSubject.next(value);
    }

    ngOnDestroy() {
        this.emailChangeSub.unsubscribe();
        this.passwordChangeSub.unsubscribe();
        this.signInFailedSubject.next();
        this.signInFailedSubject.complete();
        this.initForm();
    }

    private initForm(): void {
        this.signinForm = new FormGroup({
            email: new FormControl('', [ Validators.required, Validators.pattern(Constant.EMAIL_PATTERN)]),
            password: new FormControl('', [ Validators.required ])
        });
    }

    private initSub(): void {
        this.emailChangeSub = this.emailChangeSubject.subscribe((value) => {
                this.signinForm.patchValue({email: value});
            });
        this.passwordChangeSub = this.passwordChangeSubject.subscribe((value) => {
                this.signinForm.patchValue({password: value});
            });
    }

    private initSignInSub(): void {
        this.actionsSubject.pipe(
            ofType(CalDataActionTypes.PostUserLoginFailed),
            takeUntil(this.signInFailedSubject)
        ).subscribe((res: any) => {
            if (this.signinForm && res && res.error && res.error.status === HttpStatus.BAD_REQUEST) {
                this.signinForm.controls['email'].setErrors( { 'invalidEmail': true });
            }
            if (this.signinForm && res && res.error && res.error.status === HttpStatus.ACCESS_DENIED) {
                this.signinForm.controls['password'].setErrors( { 'invalidPassword': true });
            }
            if (res && res.error && res.error.status === HttpStatus.SERVER_ERROR) {
                this.signInError = true;
            }
        });
    }

    public signinClick(): void {
        this.signInError = false;
        this.signinForm.markAllAsTouched();
        if (this.signinForm.invalid) return;
        this.store.dispatch(new PostUserLoginAction(this.signinForm.value));
    }

}
