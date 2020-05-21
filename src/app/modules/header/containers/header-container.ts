import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { ModalType } from 'src/app/constants/enums/modal-type';

@Component({
    selector: 'app-header',
    templateUrl: './header-container.html',
    styleUrls: ['./header-container.scss']
})
export class HeaderContainerComponent {
    
    public modalType = ModalType.PLAIN_TYPE;
    public accountModalShow = false;

    public SIGN_IN = 'signin';
    public SIGN_UP = 'signup';

    public activeTap: string;
    @ViewChildren('tab') 
    public tabs: QueryList<ElementRef>;


    public showModal(tabString: string): void {
        this.activeTab(tabString);
        this.accountModalShow = true;
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
    }

}