import {Component, OnInit} from '@angular/core';
import {MapService} from '../map/map.service';

@Component({
  selector: 'app-edit-location-options',
  templateUrl: './edit-location-options.component.html',
  styleUrls: ['./edit-location-options.component.scss']
})
export class EditLocationOptionsComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
  }

  addMarkers() {
  }
}
