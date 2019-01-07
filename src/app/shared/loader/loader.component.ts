import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class LoaderComponent implements OnInit {

    public loading;

    constructor(private loaderService: LoaderService,) {
        this.loaderService.loaderState.subscribe((state) => {
            this.loading = state;
        });
    }

    ngOnInit() {

    }

}
