import {Injectable} from '@angular/core';
import {DatabaseService} from "../../services/database.service";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private database: DatabaseService) {

    }

    recover(email) {
        return new Promise<any>((resolve, reject) => {
            this.database.post('/api/recover/request', email).then((response:any) => {
                resolve(response);
            }).catch(response => {
                reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
            });
        });
    }

    validate(data) {
        return new Promise<any>((resolve, reject) => {
            this.database.post('/api/recover/validate', data).then((response:any) => {
                resolve(response);
            }).catch(response => {
                reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
            });
        });
    }
}
