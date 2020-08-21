import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../../reducers/index';
import { distinctUntilChanged } from 'rxjs/internal/operators';
import { UpdateProjectionNameAction } from 'src/app/actions/calData.action';

@Component({
    selector: 'app-name-component',
    templateUrl: './name-component.html',
    styleUrls: ['./name-component.scss']
  })
  export class NameComponent implements OnInit, OnDestroy {

    @Output() update: EventEmitter<boolean> = new EventEmitter();
    // tslint:disable-next-line:no-input-rename
    @Input('projectionId')
    public projectionId: string;
    // tslint:disable-next-line:no-input-rename
    @Input('name')
    public name: string;

    public nameForm: FormGroup;
    private projectionNameChangeSub: Subscription;
    private projectionNameChangeSubject = new Subject<any>();

    constructor(public store: Store<reducerRoot.CalDataState>) {}

    ngOnInit() {
        this.initForm();
        this.initSub();
    }

    ngOnDestroy() {
        this.projectionNameChangeSub.unsubscribe();
    }

    private initSub(): void {
        this.projectionNameChangeSub = this.projectionNameChangeSubject.pipe(
            distinctUntilChanged()
        ).subscribe((value) => {
            this.updateNameAction(value);
        });
    }

    private initForm(): void {
        this.nameForm = new FormGroup({
            projectionName: new FormControl(this.name, [ Validators.required ])
        });
    }

    public bindProjectionNameChangeSubject(value): void {
        this.projectionNameChangeSubject.next(value);
    }

    private updateNameAction(name: string): void {
        this.store.dispatch(new UpdateProjectionNameAction(this.projectionId, name));
        this.update.emit(true);
    }


}
