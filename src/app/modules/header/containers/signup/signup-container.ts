import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import { Constant } from 'src/app/constants/constant';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup-container.html',
    styleUrls: ['./signup-container.scss']
})
export class SignupContainer implements OnInit, OnDestroy {

    public signupForm: FormGroup;

    private emailChangeSub: Subscription;
    private emailChangeSubject = new Subject<any>();
    private userNameChangeSub: Subscription;
    private userNameChangeSubject = new Subject<any>();
    private passwordChangeSub: Subscription;
    private passwordChangeSubject = new Subject<any>();


    ngOnInit() {
        this.initForm();
        this.initSub();
    }

    ngOnDestroy() {
        this.emailChangeSub.unsubscribe();
        this.userNameChangeSub.unsubscribe();
        this.passwordChangeSub.unsubscribe();
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

    private initSub(): void {

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


    public signupClick(): void {
        this.signupForm.markAllAsTouched();
        if (this.signupForm.invalid) return;
        console.log(this.signupForm.value);
        // dispatch action
    }

}