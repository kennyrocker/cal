import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Constant } from 'src/app/constants/constant';

@Component({
    selector: 'app-signin',
    templateUrl: './signin-container.html',
    styleUrls: ['./signin-container.scss']
})
export class SigninContainer implements OnInit, OnDestroy {
    
    public signinForm: FormGroup;
    private emailChangeSub: Subscription;
    private emailChangeSubject = new Subject<any>();
    private passwordChangeSub: Subscription;
    private passwordChangeSubject = new Subject<any>();


    ngOnInit() {
        this.initForm();
        this.initSub();
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
    }

    private initForm(): void {
        this.signinForm = new FormGroup({
            email: new FormControl('', [ Validators.required, Validators.email ]),
            password: new FormControl('', [ Validators.required ])
        });
    }

    private initSub(): void { 
        this.emailChangeSub = this.emailChangeSubject.pipe(
                debounceTime(Constant.INPUT_DEBOUNCE_TIME),
                distinctUntilChanged()
            ).subscribe((value) => {
                this.signinForm.patchValue({email: value});
            });
     
        this.passwordChangeSub = this.passwordChangeSubject.pipe(
                debounceTime(Constant.INPUT_DEBOUNCE_TIME),
                distinctUntilChanged()
            ).subscribe((value) => {
                this.signinForm.patchValue({password: value});
            });
    }

    public signinClick(): void {
        this.signinForm.markAllAsTouched();
        if (this.signinForm.invalid) return;
        console.log(this.signinForm.value);
        // dispatch action
    }

}