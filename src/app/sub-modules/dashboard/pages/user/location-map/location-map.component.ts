import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute} from '@angular/router';
import {MapComponent} from '../../overview/map/map.component';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {

  public location;

  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  public config = {
    sensors: false,
    recordPoints: false
  };

  private sensorsMarkers = [];
  private recordPointsMarkers = [];
  private ranges = {};

  constructor(private locationService: LocationService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.locationService.getLocationById(id).then((location) => {
      this.location = location;
      this.mapComponent.displayLocation(this.location);
    }).catch(response => console.log(response));
  }

  togglePins(value, type) {
    if (value) {
      if (type === 'sensors') {
        this.location.sensors.forEach((sensor) => {
          this.mapComponent.addMarker(sensor.coordinates,null,(marker)=>{
            console.log(sensor);
            console.log(marker.position.lat(),marker.position.lng())
          }).then(sensor => {
            this.sensorsMarkers.push(sensor);
          });
        });
      } else if (type === 'recordPoints') {
        this.location.record_points.forEach((recordPoint) => {
          this.mapComponent.addMarker(recordPoint.coordinates, 'assets/img/map/pin60.png', (marker) => {
            if (!this.ranges[recordPoint.id]) {
              this.ranges[recordPoint.id] = [];
              recordPoint.record_point_has_sensors.sort(function (a, b) {
                return (a.signal_record_average.level > b.signal_record_average.level ) ? 1 : ((b.signal_record_average.level  > a.signal_record_average.level ) ? -1 : 0);
              });
              console.log(recordPoint.record_point_has_sensors);
              recordPoint.record_point_has_sensors.forEach((range) => {
                console.log(range.signal_record_average,range.distance);
                this.mapComponent.addMarkerRange(marker, range.distance).then((rangeRef) => {
                  this.ranges[recordPoint.id].push(rangeRef);
                });
              });
            } else {
              this.ranges[recordPoint.id].forEach((rangeRef) => {
                this, this.mapComponent.removeMarkerRange(rangeRef);
              });
              delete this.ranges[recordPoint.id];
            }
          }).then(recordPointmarker => {
            this.recordPointsMarkers.push(recordPointmarker);
          });
        });
      }
    } else {
      if (type === 'sensors') {
        this.sensorsMarkers.forEach((marker) => {
          this.mapComponent.removeMarker(marker);
        });
        this.sensorsMarkers = [];
      } else if (type === 'recordPoints') {
        this.recordPointsMarkers.forEach((marker) => {
          this.mapComponent.removeMarker(marker);
        });
        this.recordPointsMarkers = [];
      }
    }
  }

}
