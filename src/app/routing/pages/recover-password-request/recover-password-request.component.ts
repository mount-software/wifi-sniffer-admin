import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-recover-password-request',
    templateUrl: './recover-password-request.component.html',
    styleUrls: ['./recover-password-request.component.scss']
})
export class RecoverPasswordRequestComponent implements OnInit {

    @ViewChild('f') public form: NgForm;
    private email;
    private emptyInput = true;

    constructor(private utils: UtilsService, private dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {

    }

    checkInput() {
        if (this.form.value.email) {
            this.emptyInput = false;
        }
    }

    recover(email) {
        this.utils.recover({
            email: this.email,
        }).then((response) => {
            let dialogRef = this.dialog.open(DialogComponent, {
                width: '250px',
                data: {
                    title: 'Succes',
                    message: 'adasdfsfs'
                }
            });
            // dialogRef.afterClosed().subscribe(result => {
            //     this.router.navigate(['locations']);
            // });
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

    goBack() {
        history.back();
    }
}
