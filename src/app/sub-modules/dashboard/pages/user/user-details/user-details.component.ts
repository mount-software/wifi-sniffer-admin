import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../../../services/customer.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    public user;
    private customerSubscription;
    constructor(private customerService: CustomerService, private router: Router) {
    }

    ngOnInit() {
        this.customerSubscription = this.customerService.customer().subscribe(customer => {
            this.user = customer;
        });
        console.log(this.user);
    }
}
