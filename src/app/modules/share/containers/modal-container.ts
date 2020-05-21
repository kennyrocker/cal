import { Component, Input, OnInit, Output, EventEmitter, HostListener } from "@angular/core";
import { ModalType } from 'src/app/constants/enums/modal-type';


@Component({
    selector: 'app-modal',
    templateUrl: './modal-container.html',
    styleUrls: ['./modal-container.scss']
})
export class ModalContainer implements OnInit {
    
    @Output() confirmationClick: EventEmitter<null> = new EventEmitter();
    @Output() cancelationClick: EventEmitter<null> = new EventEmitter();

    @Input()
    public show: boolean;
    @Input()
    public modalType: ModalType;
    @Input()
    public confirmButtonText: string;
    @Input()
    public cancelButtonText: string;

    ngOnInit(): void {
        this.show = false;
    }

    public confirmClick(): void {
        this.confirmationClick.emit();
    }

    public closeModal(): void {
        this.cancelationClick.emit();
    }

    public backDropClick(event: any): void {
        if (this.modalType === ModalType.PLAIN_TYPE) {
            this.closeModal();
            return;
        }
        event.stopPropagation();
    }

}