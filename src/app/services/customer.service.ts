import {Injectable} from '@angular/core';
import {DatabaseService} from './database.service';
import {BehaviorSubject} from 'rxjs/index';
import {Customer} from '../routing/interfaces/customer';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private _customer: BehaviorSubject<Customer> = new BehaviorSubject(null);

  constructor(private database: DatabaseService) {
    this.getCustomer().then((customer) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  customer() {
    return this._customer.asObservable();
  }

  login(email, password) {
    return new Promise<Customer>((resolve, reject) => {
      this.database.post('/api/v1/customer/login', {email, password}).then((response: any) => {
        localStorage.setItem('X-AUTH-TOKEN', JSON.stringify(response.token));
        this._customer.next(response.customer);
        resolve(response._customer);
      }).catch(response => {
        reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
      });
    });
  }

  logOut() {
    return new Promise((resolve, reject) => {
      this._customer.next(null);
      localStorage.setItem('X-AUTH-TOKEN', JSON.stringify(null));
      resolve();
    });
  }


  register(data) {
    return new Promise<Customer>((resolve, reject) => {
      this.database.post('/api/v1/customer/register', data).then((response: any) => {
        localStorage.setItem('X-AUTH-TOKEN', JSON.stringify(response.token));
        this._customer.next(response.customer);
        resolve(response._customer);
      }).catch(response => {
        reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
      });
    });
  }

  editUserDetails(data) {
    return new Promise<Customer>((resolve, reject) => {
      this.database.post('/api/v1/customer/edit', data).then((response: any) => {
        this._customer.next(response.customer);
        resolve(response._customer);
      }).catch(response => {
        reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
      });
    });
  }

  getCustomer(): Promise<Customer> {
    return new Promise((resolve, reject) => {
      const token = JSON.parse(localStorage.getItem('X-AUTH-TOKEN'));
      if (token) {
        this.database.get('/api/v1/customer/get', token).then((response: any) => {
          this._customer.next(response.customer);
          resolve(response._customer);
        }).catch(response => {
          reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
        });
      } else {
        reject('Nu esti autentificat');
      }
    });
  }
}
