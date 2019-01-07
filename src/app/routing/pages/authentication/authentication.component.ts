import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

    private navLinks: { id: number, name: string, path: string }[] = [
        {"id": 0, "name": "Login", "path": '/authentication/login'},
        {"id": 1, "name": "Inregistrare", "path": '/authentication/register'},
    ];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

}
