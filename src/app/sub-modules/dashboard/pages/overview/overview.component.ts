import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {LocationService} from '../../services/location.service';
import {MapComponent, MapState} from './map/map.component';
import {MatBottomSheet, MatRadioChange} from '@angular/material';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    @ViewChild(MapComponent)
    mapComponent: MapComponent;
    selectedOption = 'range';
    options = [
        'range',
        'hitmap',
    ];
    mapState = MapState;
    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

    constructor(private breakpointObserver: BreakpointObserver,
                private bottomSheet: MatBottomSheet,
                private locationService: LocationService) {
        this.locationService.getLocationById('001').then(location => {
            console.log(location);
            this.mapComponent.displayLocation(location);
        });
    }

    ngOnInit() {
    }

    addMarker() {
        // this.mapComponent.addMarker();
    }

    handleChangeOptions(option: MatRadioChange) {
        if (option.value === 'range') {
            this.mapComponent.showRanges(true);
            this.mapComponent.showHeatMap(false);
        } else if (option.value === 'hitmap') {
            this.mapComponent.showHeatMap(true);
            this.mapComponent.showRanges(false);
        }
    }

    activateEditMode() {
        this.mapComponent.state = MapState.EDIT;
        // this.bottomSheet.open(EditLocationOptionsComponent);
    }

    deactivateEditMode() {
        this.mapComponent.state = MapState.SHOW;
    }

}
