import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoaderService {

    public loaderState: Subject<any>;

    constructor() {
        this.loaderState = new Subject();
    }

    makeLoaderVisible(value: boolean) {
        this.loaderState.next(value);
    }
}
