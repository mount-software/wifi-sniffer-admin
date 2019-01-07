import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Location, WiFi} from '../../../interfaces/location';

@Component({
  selector: 'app-wifi-details-dialog',
  templateUrl: './wifi-details-dialog.component.html',
  styleUrls: ['./wifi-details-dialog.component.scss']
})
export class WifiDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { location: Location, wifi: WiFi }) {
    console.log(data);
  }

  ngOnInit() {
  }

}
