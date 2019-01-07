import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../../../../../services/customer.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from "../../../../../shared/dialog/dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit {
    @ViewChild('newPassword')
    public newPassword;
    @ViewChild('currentPassword')
    public currentPassword;
    @ViewChild('email')
    public email;
    @ViewChild('companyName')
    public companyName;
    @ViewChild('fiscalCode')
    public fiscalCode;
    @ViewChild('noTradeRegistry')
    public noTradeRegistry;
    @ViewChild('companyAddress')
    public companyAddress;
    @ViewChild('contactPersonName')
    public contactPersonName;
    @ViewChild('contactPersonPhone')
    public contactPersonPhone;
    @ViewChild('vatPay')
    public vatPay;
    @ViewChild('f')
    public form;
    public error;
    hideNewPassword = true;
    hideCurrentPassword = true;

    private customerSubscription;
    private user;

    constructor(public customerService: CustomerService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.customerSubscription = this.customerService.customer().subscribe(customer => {
            if (customer) {
                this.user = customer;
                console.log(this.user);
            }
        });
        console.log(this.user);
        // if (this.activatedRoute.snapshot.params.id) {
        //     const id = this.activatedRoute.snapshot.params.id;
        //     console.log(id);
        // }
    }


    edit() {
        this.customerService.editUserDetails({
            email: this.email,
            contactPersonName: this.contactPersonName,
            contactPersonPhone: this.contactPersonPhone,
            companyName: this.companyName,
            companyAddress: this.companyAddress,
            fiscalCode: this.fiscalCode,
            vatPay: this.vatPay,
            noTradeRegistry: this.noTradeRegistry,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
        }).then((data: any) => {
            localStorage.setItem('response', JSON.stringify(data));
            let retrievedData = localStorage.getItem("response");
            let token = JSON.parse(retrievedData);
            console.log(token);
        }, err => {
            let dialogRef = this.dialog.open(DialogComponent, {
                width: '250px',
                data: {
                    title: 'Eroare',
                    message: err
                }
            });
        });

        console.log(this.email, this.currentPassword, this.newPassword);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
        });
    }
}








