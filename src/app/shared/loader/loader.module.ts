import {NgModule} from '@angular/core';
import {LoaderComponent} from './loader.component';
import {LoaderService} from './loader.service';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [CommonModule],
    declarations: [LoaderComponent],
    exports: [LoaderComponent],
    providers: [LoaderService],

})
export class LoaderModule {
}
