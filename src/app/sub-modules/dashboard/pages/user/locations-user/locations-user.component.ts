import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../services/location.service';
import {LoaderService} from '../../../../../shared/loader/loader.service';

@Component({
    selector: 'app-locations-user',
    templateUrl: './locations-user.component.html',
    styleUrls: ['./locations-user.component.scss']
})
export class LocationsUserComponent implements OnInit {

    constructor(private locationService: LocationService, private loaderService:LoaderService) {
    }

    public locationsList;

    ngOnInit() {
        this.loaderService.makeLoaderVisible(true);
        this.locationService.getAll().then(data => {
            this.loaderService.makeLoaderVisible(false);
            this.locationsList = data;
            console.log(this.locationsList);
        });
    }

}
