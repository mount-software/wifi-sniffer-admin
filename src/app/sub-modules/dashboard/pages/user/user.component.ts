import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../../../services/customer.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    // private email;
    // private companyName;
    // private companyAddress;
    // private fiscalCode;
    // private tradeRegistryNumber;
    // private vatPay;

    private navLinks: { name: string, path: string }[] = [
        { "name": "Detalii utilizator", "path": '/user/user-details'},
        { "name": "Locatii", "path": '/user/locations' },
    ];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

}
