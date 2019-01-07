import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../../../shared/dialog/dialog.component";

@Component({
    selector: 'app-recover-password-validate',
    templateUrl: './recover-password-validate.component.html',
    styleUrls: ['./recover-password-validate.component.scss']
})
export class RecoverPasswordValidateComponent implements OnInit {

    private encodedEmail;
    private encodedToken;
    private newPassword;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private utils: UtilsService,
                private dialog: MatDialog) {
        this.encodedEmail = activatedRoute.snapshot.url[1].path;
        this.encodedToken = activatedRoute.snapshot.url[2].path;
        // this.encodedEmail = JSON.stringify(activatedRoute.snapshot.url[1].path);
        // this.encodedToken = JSON.stringify(activatedRoute.snapshot.url[2].path);
        console.log(this.encodedEmail, this.encodedToken);
    }

    ngOnInit() {
    }

    validate(data) {
        this.utils.validate(
            {
                encodedEmail: this.encodedEmail,
                encodedToken: this.encodedToken,
                newPassword: this.newPassword
            }).then((response) => {
            let dialogRef = this.dialog.open(DialogComponent, {
                width: '250px',
                data: {
                    title: 'Succes',
                    message: 'Parola a fost resetata cu succes!'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['/login']);
            });
        }, err => {
            let dialogRef = this.dialog.open(DialogComponent, {
                width: '250px',
                data: {
                    title: 'Eroare',
                    message: err
                }
            });
        });
    }
}
