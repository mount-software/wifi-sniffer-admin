import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../../../shared/dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';
import {LoaderService} from '../../../../../shared/loader/loader.service';

@Component({
    selector: 'app-edit-location-user',
    templateUrl: './edit-location-user.component.html',
    styleUrls: ['./edit-location-user.component.scss']
})
export class EditLocationUserComponent implements OnInit {

    @ViewChild('f') public form;
    public infoLocation;
    public name;
    public country;
    public address;
    public city;
    public floor;
    public lat;
    public lng;
    @ViewChild('error') public error;
    @ViewChild('errorMessage') public errorMessage;
    @ViewChild('f')
    private route: any;
    public id;
    public nameAdd = '';
    public countryAdd = '';
    public addressAdd = '';
    public cityAdd = '';
    public floorAdd = '';
    public latAdd = '';
    public lngAdd = '';
    public newLocation;
    public buttonText = 'Salveaza modificari';
    public addLocationInput = false;

    constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, public locationService: LocationService, private router: Router, public loaderService:LoaderService) {
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.loaderService.makeLoaderVisible(true);
            this.addLocationInput = false;
            const id = this.activatedRoute.snapshot.params.id;
            this.locationService.getLocationById(id).then(location => {
                this.loaderService.makeLoaderVisible(false);
                this.infoLocation = location;
                this.name = location.name;
                this.country = location.country;
                this.address = location.address;
                this.city = location.city;
                this.floor = location.floor;
                this.lat = location.lat_coords;
                this.lng = location.long_coords;
            }).catch(err => {
                console.log(err);
            });
            this.buttonText = 'Salveaza modificari';
        } else {
            this.addLocationInput = true;
            this.name = this.nameAdd;
            this.country = this.countryAdd;
            this.address = this.addressAdd;
            this.city = this.cityAdd;
            this.floor = this.floorAdd;
            this.lat = this.latAdd;
            this.lng = this.lngAdd;
            this.buttonText = 'Adauga locatie';
        }
        console.log(this.buttonText);
    }

    editLocation() {
        if (this.activatedRoute.snapshot.params.id) {
            this.locationService.editLocation(this.infoLocation, this.name, this.country, this.address, this.city, this.floor, this.lat, this.lng)
                .then((data: any) => {
                    let dialogRef = this.dialog.open(DialogComponent, {
                        width: '250px',
                        data: {
                            title: 'Succes',
                            message: 'Modificare reusita'
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        this.router.navigate(['/user/locations']);
                    });
                }, err => {
                    this.dialog.open(DialogComponent, {
                        width: '250px',
                        data: {
                            title: 'Eroare',
                            message: err
                        }
                    });
                });
        } else {
            this.newLocation = this.form.value;
            if (this.form.valid) {
                this.locationService.addLocation(this.newLocation)
                    .then((data: any) => {
                        let dialogRef = this.dialog.open(DialogComponent, {
                            width: '250px',
                            data: {
                                title: 'Succes',
                                message: 'Locatie adaugata'
                            }
                        });
                        dialogRef.afterClosed().subscribe(result => {
                            this.router.navigate(['/user/locations']);
                        });
                    }, err => {
                        this.dialog.open(DialogComponent, {
                            width: '250px',
                            data: {
                                title: 'Eroare',
                                message: err
                            }
                        });
                    });
            }
        }
    }


    goBack() {
        history.back();
    }
}