import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

    public user;
    private customerSubscription;

    constructor(private breakpointObserver: BreakpointObserver, private customerService: CustomerService, private router: Router) {
        this.customerService.getCustomer();
    }


    ngOnInit() {
        this.customerSubscription = this.customerService.customer().subscribe(customer => {
            this.user = customer;
        });
        console.log(this.user);
    }


    ngOnDestroy() {
        if (this.customerSubscription) {
            this.customerSubscription.unsubscribe();
        }
    }

    logOut() {
        this.customerService.logOut();
        this.router.navigate(['login']);
    }
}
