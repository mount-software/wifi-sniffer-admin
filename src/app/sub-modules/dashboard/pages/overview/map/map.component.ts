import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MapService} from './map.service';
import {Location, WiFi} from '../../../interfaces/location';
import {LocationService} from '../../../services/location.service';
import {MatDialog} from '@angular/material';
import {WifiDetailsDialogComponent} from '../wifi-details-dialog/wifi-details-dialog.component';

export enum MapState {
  ADD = 'add',
  SHOW = 'show',
  EDIT = 'edit'
}

const DEFAULT_WIFI_RANGE = 50;

class WifiMapBounds {
  public wifi: WiFi;
  public marker: any;
  public range: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private mapObject;

  private _state = MapState.SHOW;

  get state() {
    return this._state;
  }

  set state(value: MapState) {
    this._state = value;
    if (this._state == MapState.EDIT) {
      this.makeMarkersEditable(true);
    } else {
      this.makeMarkersEditable(false);
    }
  }


  @ViewChild('map')
  private mapElement;

  @Output()
  onMarkerSelect = new EventEmitter<any>();

  private displayedLocation;
  private locationOverlay;
  private displayedPolygon;
  private wifiMapBoundsList: Array<WifiMapBounds> = [];
  private displayedHeatMap;

  constructor(private mapService: MapService, private locationService: LocationService, private dialog: MatDialog) {
    mapService.mapComponent = this;
  }

  ngOnInit() {
    this.mapService.getSdk().then((googleMaps) => {
      this.mapObject = new googleMaps.maps.Map(this.mapElement.nativeElement, {
        center: JSON.parse(localStorage.getItem('center')) || {lat: 44.4303047, lng: 26.0519154},
        zoom: 23,
        // draggable: false,
        // zoomControl: false,
        // scrollwheel: false,
        disableDoubleClickZoom: false
      });
      googleMaps.maps.event.addListener(this.mapObject, 'click', function(event) {

       console.log(event.latLng.lat(),event.latLng.lng());

      });
      // this.mapObject.addListener('click', (event) => {
      //   console.log('Latitude: ' + event.latLng.lat() + ' ' + ', longitude: ' + event.latLng.lng());
      //   this.locationService.addLocationHeatMapPoint(this.displayedLocation, {
      //     coordinates: {lat: event.latLng.lat(), lng: event.latLng.lng()},
      //     weight: 2
      //   });
      // });

    }).catch((error) => {
      console.log(error);
    });

  }

  displayLocation(location) {
    if (!this.displayedPolygon || this.displayedLocation.id != location.id) {
      this.mapService.getSdk().then((googleMaps) => {
        this.removeLocation();
        if (location && location.location_mapping && location.location_mapping.coordinates && location.location_mapping.coordinates.length) {
          let locationCoordinates = this.parseCoordinatesObject(location.location_mapping.coordinates);
          this.displayedPolygon = new googleMaps.maps.Polygon({
            paths: locationCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            editable: false
          });
          // this.displayedPolygon.setMap(this.mapObject);
          let bounds = new googleMaps.maps.LatLngBounds();
          locationCoordinates.forEach((coord) => {
            bounds.extend(coord);
          });
          this.mapObject.setCenter(bounds.getCenter());
          this.displayedLocation = location;

          this.showPlan(location.blue_print_image);

        } else {
          throw new Error('try to display location without location_mapping');
        }
      });
    }
  }

  addLocation() {
    this.removeLocation();
    this._state = MapState.ADD;
    this.mapObject.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      zoom: 12
    });
  }

  removeLocation() {
    if (this.displayedPolygon) {
      this.displayedPolygon.setMap(null);
      this.displayedPolygon = null;
      this.wifiMapBoundsList.forEach((bounds: WifiMapBounds) => {
        bounds.marker.removeListener('click');
        bounds.marker.setMap(null);
        bounds.range.setMap(null);
      });

      if (this.locationOverlay) {
        this.locationOverlay.setMap(null);
      }
      this.wifiMapBoundsList = [];
    }
  }

  drawDummyPolygon() {
    this.removeLocation();
    this.mapService.getSdk().then((googleMaps) => {
      const mapCenter = {lat: this.mapObject.getCenter().lat(), lng: this.mapObject.getCenter().lng()};
      const mapCenter2 = {lat: mapCenter.lat + 0.0001, lng: mapCenter.lng + 0.0004};
      const mapCenter3 = {lat: mapCenter2.lat + 0.0004, lng: mapCenter2.lng + 0.0001};
      let triangleCoords = [mapCenter, mapCenter2, mapCenter3];
      this.displayedPolygon = new googleMaps.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        editable: true
      });
      this.displayedPolygon.setMap(this.mapObject);
    }).catch((error) => {
      console.log('google sdk not loaded');
    });
  }

  getCenter() {
    return {lat: this.mapObject.getCenter().lat(), lng: this.mapObject.getCenter().lng()};
  }

  getLocationCoords() {

    if (this.displayedPolygon) {
      if (this.displayedLocation) {

      } else {

      }
    }


    let vertices = this.displayedPolygon.getPath();
    let coords = [];
    for (var i = 0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      coords.push({lat: xy.lat(), lng: xy.lng()});
    }
    // localStorage.setItem('coords', JSON.stringify(coords));
    console.log('updated', coords);
    return coords;
    // bermudaTriangle.setOptions({editable: false});
  }

  addMarker(coordinates, icon?, action?) {
    return new Promise((resolve, reject) => {
      this.mapService.getSdk().then((googleMaps) => {
        let marker = new googleMaps.maps.Marker({
          position: this.parseCoordinatesObject(coordinates),
          map: this.mapObject,
          icon: icon,
        });
        if (icon) {
          marker.setOptions({
            icon: icon,
          });
        }
        if (action) {
          marker.addListener('click', () => {
            action(marker);
            // this.dialog.open(WifiDetailsDialogComponent, {
            //   width: '450px',
            //   data: {
            //     location: this.displayedLocation,
            //     wifi: wifi
            //   }
            // });
            // this.onMarkerSelect.emit(wifi);
          });
        }
        resolve(marker);

        // let circle = new googleMaps.maps.Circle({
        //   map: this.mapObject,
        //   radius: wifi ? wifi.radius : DEFAULT_WIFI_RANGE,
        //   fillColor: '#FF6700',
        //   strokeWeight: 1,
        // });
        // circle.bindTo('center', marker, 'position');
        //
        // let wifiMapBounds = new WifiMapBounds();
        // wifiMapBounds.wifi = wifi;
        // wifiMapBounds.marker = marker;
        // wifiMapBounds.range = circle;
        // this.wifiMapBoundsList.push(wifiMapBounds);


        // if (!wifi) {
        //   let wifi: WiFi = {
        //     id: this.displayedLocation && this.displayedLocation.wifiList ? this.displayedLocation.wifiList.length + '' : '0',
        //     coordinates: {
        //       lat: this.mapObject.getCenter().lat(),
        //       lng: this.mapObject.getCenter().lng()
        //     },
        //     radius: DEFAULT_WIFI_RANGE
        //   };
        //
        //   marker.addListener('dragend', (event) => {
        //     wifi.coordinates = {
        //       lat: event.latLng.lat(),
        //       lng: event.latLng.lng()
        //     };
        //     this.locationService.updateLocationWifiCoordinates(this.displayedLocation, wifi);
        //   });
        //
        //   this.locationService.addLocationWifi(this.displayedLocation, wifi).then(() => {
        //     this.displayedLocation.wifiList.push(wifi);
        //   });
        // }
      }).catch((error) => reject(error));
    });
  }

  removeMarker(marker) {
    marker.setMap(null);
  }

  addMarkerRange(marker, distance) {
    return new Promise((resolve, reject) => {
      this.mapService.getSdk().then((googleMaps) => {
        let circle = new googleMaps.maps.Circle({
          map: this.mapObject,
          radius: distance,
          fillColor: 'transparent',
          strokeWeight: 1,
        });
        circle.bindTo('center', marker, 'position');
        resolve(circle);
      }).catch((error) => reject(error));
    });
  }

  removeMarkerRange(range) {
    range.setMap(null);
  }

  makeMarkersEditable(boolean) {
    this.wifiMapBoundsList.forEach((bounds) => {
      bounds.marker.setOptions({
        draggable: boolean
      });

      bounds.marker.addListener('dragend', (event) => {
        bounds.wifi.coordinates = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        console.log(bounds.wifi);
        this.locationService.updateLocationWifiCoordinates(this.displayedLocation, bounds.wifi);
      });
    });
  }

  showRanges(bool) {
    this.wifiMapBoundsList.forEach((bounds) => {
      bounds.range.setOptions({
        fillOpacity: bool ? 0.35 : 0,
        strokeWeight: bool ? 1 : 0,
      });
      bounds.marker.setVisible(bool);
    });
  }


  showHeatMap(bool) {
    if (bool) {
      this.mapService.getSdk().then((googleMaps) => {
        let heatMapData = [];
        this.displayedLocation.heatMap.forEach((weightLocation) => {
          heatMapData.push({location: new googleMaps.maps.LatLng(weightLocation.coordinates), weight: weightLocation.weight});
        });
        this.displayedHeatMap = new googleMaps.maps.visualization.HeatmapLayer({
          data: heatMapData
        });
        this.displayedHeatMap.setMap(this.mapObject);
      });
    } else {
      this.displayedHeatMap.setMap(null);
      this.displayedHeatMap = null;
    }

  }

  private showPlan(imageUrl) {
    if (imageUrl) {
      console.log(imageUrl);
      this.mapService.getSdk().then((googleMaps) => {
        let bounds = new googleMaps.maps.LatLngBounds();

        this.displayedPolygon.getPath().forEach((element) => {
          bounds.extend(element);
        });
        let LocationOverlay = function (bounds, image, map) {
          this.bounds_ = bounds;
          this.image_ = image;
          this.map_ = map;
          this.div_ = null;
          this.setMap(map);
        };
        LocationOverlay.prototype = new googleMaps.maps.OverlayView();
        LocationOverlay.prototype.onAdd = function () {

          let div = document.createElement('div');
          div.style.borderStyle = 'none';
          div.style.borderWidth = '0px';
          div.style.position = 'absolute';

          // Create the img element and attach it to the div.
          let img = document.createElement('img');
          img.src = this.image_;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.position = 'absolute';
          div.appendChild(img);

          this.div_ = div;

          let panes = this['getPanes']();
          panes.overlayLayer.appendChild(div);
        };
        LocationOverlay.prototype.onRemove = function () {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
        };
        LocationOverlay.prototype.draw = function () {
          let overlayProjection = this['getProjection']();
          let sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
          let ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
          let div = this.div_;
          div.style.left = sw.x + 'px';
          div.style.top = ne.y + 'px';
          div.style.width = (ne.x - sw.x) + 'px';
          div.style.height = (sw.y - ne.y) + 'px';
        };
        this.locationOverlay = new LocationOverlay(bounds, imageUrl, this.mapObject);
      });
    }
  }

  private parseCoordinatesObject(coordinates) {
    if (Array.isArray(coordinates)) {
      return coordinates.map((coord) => {
        return this.parseCoordinatesObject(coord);
      });
    } else {
      if (coordinates.latitude && coordinates.longitude) {
        return {lat: coordinates.latitude, lng: coordinates.longitude};
      } else if (coordinates.lat && coordinates.lng) {
        return coordinates;
      }
    }
  }


}






