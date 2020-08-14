import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import { Constant } from 'src/app/constants/constant';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ActionsSubject, Store } from '@ngrx/store';
import * as reducerRoot from '../../../../reducers';
import { PostUserAction } from '../../../../actions/calData.action';
import { ofType } from '@ngrx/effects';
import { CalDataActionTypes } from '../../../../actions/calData.action';
import { HttpStatus } from '../../../../constants/enums/http-status';

@Component({
    selector: 'app-signup',
    templateUrl: './signup-container.html',
    styleUrls: ['./signup-container.scss']
})
export class SignupContainer implements OnInit, OnDestroy {

    @Output() registerCompleted: EventEmitter<boolean> = new EventEmitter();

    public signupForm: FormGroup;
    private emailChangeSub: Subscription;
    private emailChangeSubject = new Subject<any>();
    private userNameChangeSub: Subscription;
    private userNameChangeSubject = new Subject<any>();
    private passwordChangeSub: Subscription;
    private passwordChangeSubject = new Subject<any>();
    private registerSuccessSubject = new Subject<any>();
    private registerFailedSubject = new Subject<any>();
    public registerError = false;
    public registerSuccess = false;
    private timeOut;
    private timeOutDuration = 3000;


    constructor(
        private actionsSubject: ActionsSubject,
        private store: Store<reducerRoot.CalDataState>) {
        this.initRegisterSub();
    }

    ngOnInit() {
        this.initForm();
        this.initFormSub();
    }

    ngOnDestroy() {
        this.emailChangeSub.unsubscribe();
        this.userNameChangeSub.unsubscribe();
        this.passwordChangeSub.unsubscribe();
        this.registerSuccessSubject.next();
        this.registerSuccessSubject.complete();
        this.registerFailedSubject.next();
        this.registerFailedSubject.complete();
        if (this.timeOut) clearTimeout(this.timeOut);
    }

    public bindEmailChangeSubject(value): void {
        this.emailChangeSubject.next(value);
      }

    public bindUserNameChangeSubject(value): void {
        this.userNameChangeSubject.next(value);
    }

    public bindPasswordChangeSubject(value): void {
        this.passwordChangeSubject.next(value);
    }

    private initForm(): void {
        this.signupForm = new FormGroup({
            email: new FormControl('', [ Validators.required, Validators.email ]),
            userName: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ])
        });
    }

    private initFormSub(): void {

        this.emailChangeSub = this.emailChangeSubject.pipe(
                debounceTime(Constant.INPUT_DEBOUNCE_TIME),
                distinctUntilChanged()
            ).subscribe((value) => {
                this.signupForm.patchValue({email: value});
            });

        this.userNameChangeSub = this.userNameChangeSubject.pipe(
                debounceTime(Constant.INPUT_DEBOUNCE_TIME),
                distinctUntilChanged()
            ).subscribe((value) => {
                this.signupForm.patchValue({userName: value});
            });

        this.passwordChangeSub = this.passwordChangeSubject.pipe(
                debounceTime(Constant.INPUT_DEBOUNCE_TIME),
                distinctUntilChanged()
            ).subscribe((value) => {
                this.signupForm.patchValue({password: value});
            });
    }

    private initRegisterSub(): void {
        this.actionsSubject.pipe(
            ofType(CalDataActionTypes.PostUserSuccess),
            takeUntil(this.registerSuccessSubject)
        ).subscribe(() => {
            this.initForm();
            this.registerSuccess = true;
            this.timeOut = setTimeout(() => {
              this.registerCompleted.emit();
            }, this.timeOutDuration);
        });

        this.actionsSubject.pipe(
            ofType(CalDataActionTypes.PostUserFailed),
            takeUntil(this.registerFailedSubject)
        ).subscribe((res: any) => {
            if (!this.signupForm) return;
            if (res.error.status === HttpStatus.CONFLICT) {
                this.signupForm.controls['email'].setErrors({ 'notUnique': true });
            }
            if (res.error.status === HttpStatus.SERVER_ERROR) {
              this.registerError = true;
            }
        });
    }

    public signupClick(): void {
        this.registerError = false;
        this.registerSuccess = false;
        this.signupForm.markAllAsTouched();
        if (this.signupForm.invalid) { return; }
        this.store.dispatch(new PostUserAction(this.signupForm.value));
    }

}
