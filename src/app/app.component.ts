import {Component} from '@angular/core';
import {CustomerService} from "./services/customer.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    constructor(private customerService: CustomerService) {

    }
}