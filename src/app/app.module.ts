import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardModule} from './sub-modules/dashboard/dashboard.module';
import {AppRoutingModule} from './routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatInputModule, MatSelectModule} from "@angular/material";
import {LoaderModule} from './shared/loader/loader.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        MatSelectModule,
        MatInputModule,
        LoaderModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
