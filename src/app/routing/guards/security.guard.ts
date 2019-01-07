import {Injectable, isDevMode} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LOGIN_ROUTE} from '../routes';
import {Observable} from 'rxjs';
import {CustomerService} from '../../services/customer.service';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(private router: Router, private customerService: CustomerService) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      if (isDevMode()) {
        console.log('Evaluate SecurityGuard');
      }
      this.customerService.getCustomer().then((customer) => {
        console.log(customer);
        resolve(true);
      }).catch((error) => {
        console.log(error);
        resolve(false);
        this.router.navigateByUrl(LOGIN_ROUTE);
      });
    });

  }
}
