import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {LoaderService} from '../../../shared/loader/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('password')
    public password;
    @ViewChild('email')
    public email;
    @ViewChild('errorMessage')
    public errorMessage;
    @ViewChild('f')
    public form;

    hide = true;
    public disButton = true;

    constructor(public customerService: CustomerService, public dialog: MatDialog, private router: Router, private loaderService: LoaderService,) {
    }

    ngOnInit() {
    }

    verifyform() {
        if (this.email && this.password) {
            this.disButton = false;
        }
    }

    login(email: string, password: string) {
        console.log(email, password);
        this.loaderService.makeLoaderVisible(true);
        this.customerService.login(this.email, this.password).then((customer) => {
            this.router.navigate(['/user']);
            this.loaderService.makeLoaderVisible(false);
        }, err => {
            console.log(err);

            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {
                    title: 'Erroare',
                    message: err
                }
            });
        });
        this.form.reset();
        this.disButton = true;
        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
        });
    }
}
