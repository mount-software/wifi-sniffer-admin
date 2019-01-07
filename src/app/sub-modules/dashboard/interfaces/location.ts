export interface Location {
    id: string,
    name: string,
    city: string,
    country: string,
    floor: string,
    address: string
    heatMap: Array<{ coordinates: Coordinates, weight: number }>
    center: Coordinates,
    locationPlan: string
    coordinates: Array<Coordinates>
    wifiList: Array<WiFi>
    lat_coords: number;
    long_coords: number;
}

export interface WiFi {
    id: string
    coordinates: Coordinates
    radius?: number
    onlineVisitors?: number
    lastDayVisitors?: number
    lastMonthVisitors?: number
}

export interface Coordinates {
    lat: number,
    lng: number
}
