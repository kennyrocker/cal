import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    styleUrls: ['./app.footer.component.scss']
})
export class FooterComponent {
    public year = new Date().getFullYear();
}
