import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatBottomSheetModule,
    MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule,
    MatSidenavModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverviewComponent} from './pages/overview/overview.component';
import {DashboardComponent} from './dashboard.component';
import {UserComponent} from './pages/user/user.component';
import {EditUserComponent} from './pages/user/edit/edit.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LocationService} from "./services/location.service";
import {DatabaseService} from "../../services/database.service";
import { EditLocationUserComponent } from './pages/user/edit-location-user/edit-location-user.component';
import { LocationsUserComponent } from './pages/user/locations-user/locations-user.component';
import {WifiSettingsComponent} from "./pages/wifi-settings/wifi-settings.component";
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import {MapModule} from './pages/overview/map/map.module';
import { LocationMapComponent } from './pages/user/location-map/location-map.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FormsModule,
        RouterModule,
        MatInputModule,
        MatRadioModule,
        MapModule,
        MatBottomSheetModule,
        MatCardModule,
        MatGridListModule,
        MatTabsModule,
    ],
    providers: [
        LocationService,
        DatabaseService
    ],
    declarations: [OverviewComponent, DashboardComponent, UserComponent,  UserDetailsComponent, EditUserComponent, EditLocationUserComponent, LocationsUserComponent, WifiSettingsComponent, LocationMapComponent],
    exports: []
})
export class DashboardModule {
}
