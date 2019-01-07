import {Injectable} from '@angular/core';
import {GOOGLE_MAPS_API_KEY} from '../../../../../config/parameters';
import {MapComponent} from './map.component';

@Injectable()
export class MapService {



  private maps: any;

  private _mapComponent: MapComponent;

  get mapComponent(): MapComponent {
    return this._mapComponent;
  }

  set mapComponent(value: MapComponent) {
    this._mapComponent = value;
  }

  constructor() {
  }

  public getSdk() {
    return new Promise<any>((resolve, reject) => {
      if (!this.maps || (window['google'] && !window['google']['maps'])) {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_API_KEY +'&libraries=visualization';
        script.onload = () => {
          if (window['google']) {
            this.maps = window['google'];
            resolve(this.maps);
          } else {
            reject('Could not load google maps sdk');
            throw new Error('Could not load google maps sdk');
          }
        };
        head.appendChild(script);
      } else {
        resolve(this.maps);
      }
    });
  }


}



