import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup-container.html',
    styleUrls: ['./signup-container.scss']
})
export class SignupContainer implements OnInit, OnDestroy {

    public signupForm: FormGroup;

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {

    }

    private initForm(): void {
        this.signupForm = new FormGroup({
            email: new FormControl('', [ Validators.required ]),
            userName: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
            conformPw: new FormControl('', [ Validators.required ])
        });
    }


    public signupClick(): void {
        if (this.signupForm.invalid) return;
        // dispatch action
    }

}