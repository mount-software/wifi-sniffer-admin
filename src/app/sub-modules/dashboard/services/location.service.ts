import {Injectable} from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import {Coordinates, Location, WiFi} from '../interfaces/location';
import {Customer} from '../../../routing/interfaces/customer';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class LocationService {

  private locationsList;
  private WIFI_SIGNAL_MAP = {};


  constructor(private database: DatabaseService) {
  }

  getAll(): Promise<Array<Location>> {
    return new Promise((resolve, reject) => {
      this.database.get('/api/v1/customer/location/all').then(locationsObject => {
        if (!Array.isArray(locationsObject)) {
          let locationsArray = [];
          Object.keys(locationsObject).forEach((key) => {
            locationsArray.push(locationsObject[key]);
          });
          locationsObject = locationsArray;
        }
        resolve(locationsObject);
      }).catch(response => {
        reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
      });
    });
  }

  editLocation(location, name, country, address, city, floor, lat, lng) {
    return new Promise<Location>((resolve, reject) => {
      this.database.post('/api/v1/customer/location/' + location.id + '/edit', {
        location, name, country, address, city, floor, lat, lng
      }).then((response: any) => {
        console.log(response);
        resolve(response);
      }).catch(response => {
        reject(response && response.error && response.error.errorMessage ? response.error.errorMessage : 'A aparut o eroare');
      });
    });
  }

  getLocationById(id): Promise<Location> {
    return new Promise((resolve, reject) => {
      this.database.get('/api/v1/customer/location/' + id).then(locationObject => {
        console.log(locationObject);
        resolve(locationObject);
      }).catch(error => {
        reject(error);
      });
    });
  }

  addLocation(location: Location) {
    return this.database.post('/api/v1/customer/location/add', location);
  }

  addLocationWifi(location: Location, wifi: WiFi) {
    console.log(wifi);
    return this.database.post('/locations/' + location.id + '/wifiList/' + wifi.id, wifi);
  }

  updateLocationWifiCoordinates(location: Location, wifi: WiFi) {
    return this.database.post('/locations/' + location.id + '/wifiList/' + wifi.id + '/coordinates', wifi.coordinates);
  }

  addLocationHeatMapPoint(location: Location, weightedLocation: { coordinates: Coordinates, weight: number }) {
    return this.database.push('/locations/' + location.id + '/heatMap', weightedLocation);
  }

}
