import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MapService} from './map.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [MapService],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapModule {
}
