import {Injectable} from '@angular/core';
import {FIREBASE_CONFIG} from '../config/parameters';
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let firebase: any;

@Injectable()
export class DatabaseService {

    public readonly database;
    private host = 'http://wifisnifferadminbackend.master.dev.www.ro';
    private hostProxy = '/hostProxy';

    constructor(private http: HttpClient) {
        if (firebase) {
            firebase.initializeApp(FIREBASE_CONFIG);
            this.database = firebase.database();
        } else {
            throw new Error('firebase object not initialized! Verify SDK');
        }
    }

    private getHost() {
        return window.location.hostname == 'localhost' ? this.hostProxy : this.host;
    }

    private getAuthHeaders() {
        let headers;
        const token = JSON.parse(localStorage.getItem('X-AUTH-TOKEN'));
        if (token) {
            headers = new HttpHeaders({'X-AUTH-TOKEN': token});
        } else {
            headers = new HttpHeaders();
        }
        return headers;
    }

    get(url, params?): Promise<any> {
        return this.http.get(this.getHost() + url, {
            headers: this.getAuthHeaders()
        }).toPromise();
    }

    post(url, data): Promise<any> {
        return this.http.post(this.getHost() + url, data, {
            headers: this.getAuthHeaders()
        }).toPromise();
    }

    push(url, data): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.database.ref(url).push(data);
            resolve();
        });
    }
}
