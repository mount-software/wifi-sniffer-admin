import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {SecurityGuard} from './guards/security.guard';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LOGIN_ROUTE, NOT_FOUND} from './routes';
import {OverviewComponent} from '../sub-modules/dashboard/pages/overview/overview.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DashboardComponent} from '../sub-modules/dashboard/dashboard.component';
import {UserComponent} from '../sub-modules/dashboard/pages/user/user.component';
import {EditUserComponent} from '../sub-modules/dashboard/pages/user/edit/edit.component';
import {SharedModule} from '../shared/shared.module';
import {LocationsUserComponent} from '../sub-modules/dashboard/pages/user/locations-user/locations-user.component';
import {EditLocationUserComponent} from '../sub-modules/dashboard/pages/user/edit-location-user/edit-location-user.component';
import {RegisterComponent} from './pages/register/register.component';
import {UtilsService} from './services/utils.service';
import {RecoverPasswordRequestComponent} from './pages/recover-password-request/recover-password-request.component';
import {RecoverPasswordValidateComponent} from './pages/recover-password-validate/recover-password-validate.component';
import {AuthenticationComponent} from './pages/authentication/authentication.component';
import {UserDetailsComponent} from '../sub-modules/dashboard/pages/user/user-details/user-details.component';
import {LoaderModule} from '../shared/loader/loader.module';
import {LoaderService} from '../shared/loader/loader.service';
import {LocationMapComponent} from '../sub-modules/dashboard/pages/user/location-map/location-map.component';

const routes: Routes = [

  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'authentication', component: AuthenticationComponent,
        children: [
          {path: 'register', component: RegisterComponent},
          {path: 'recover', component: RecoverPasswordRequestComponent},
          {path: 'recover/:id/:id2', component: RecoverPasswordValidateComponent},
          {path: '**', redirectTo: '/authentication/login'}
        ]
      },
      {path: LOGIN_ROUTE, component: LoginComponent},
      {path: NOT_FOUND, component: PageNotFoundComponent},
      {path: '', canActivate: [SecurityGuard], component: OverviewComponent},
      {
        path: 'user',
        component: UserComponent,
        children: [
          {path: 'user-details', component: UserDetailsComponent},
          {path: 'edit', component: EditUserComponent},
          {path: 'locations', component: LocationsUserComponent},
          {path: 'locations/add', component: EditLocationUserComponent},
          {path: 'locations/:id/edit', component: EditLocationUserComponent},
          {path: 'locations/:id/map', component: LocationMapComponent},
          {path: '**', redirectTo: '/user/user-details'}

        ]
      },
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [PageNotFoundComponent, LoginComponent, RegisterComponent, AuthenticationComponent, RecoverPasswordRequestComponent, RecoverPasswordValidateComponent],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    SharedModule,
    MatTabsModule,
    LoaderModule,

  ],
  providers: [SecurityGuard, UtilsService, LoaderService],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
