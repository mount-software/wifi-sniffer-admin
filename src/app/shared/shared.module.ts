import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material';
import {DialogComponent} from "./dialog/dialog.component";
import {LoaderModule} from './loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        LoaderModule
    ],
    declarations: [DialogComponent],
    entryComponents: [DialogComponent]
})
export class SharedModule {
}
