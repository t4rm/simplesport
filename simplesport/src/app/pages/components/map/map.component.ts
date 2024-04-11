import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym } from '../../../types/exercise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, CommonModule],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  @Input() gyms!: Gym[];
  @Input() selectedGym!: Gym;

  @Output() selectedValue = new EventEmitter<Gym>();

  mapReady = false;
  title = 'SimpleSport - Find a gym close to you !';
  center: Leaflet.LatLng = new Leaflet.LatLng(49.133333, 6.166667);
  options!: Leaflet.MapOptions;
  map!: Leaflet.Map;
  originalLatLng!: Leaflet.LatLng;

  onMapReady(map: Leaflet.Map) {
    this.map = map;
    this.originalLatLng = this.map.getCenter();
    getMarkersFromGyms(this.gyms, this.map, getIcon(), this.selectedValue).forEach((marker) => marker.addTo(this.map));
  }

  // On initialise la carte avec la position de l'utilisateur (ou Metz par défaut), puis on charge les options de la carte qui vont directement se répercuter sur notre vue (HTML).
  ngOnInit() {
    this.getUserLocation()
      .then((position) => {
        this.center = new Leaflet.LatLng(position.coords.latitude, position.coords.longitude);
      })
      .catch((error) => {
        console.error('Erreur lors de la prise de position:', error);
      })
      .finally(() => {
        this.setMapOptions();
        this.mapReady = true;
      });
  }

  setMapOptions() {
    this.options = {
      layers: getLayers(),
      zoom: 12,
      center: this.center
    };
  }

  getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gyms'] && this.map) {
      getMarkersFromGyms(this.gyms, this.map, getIcon(), this.selectedValue).forEach((marker) => marker.addTo(this.map));
    }

    if (changes['selectedGym'] && this.map) {
      if (changes['selectedGym'].currentValue) {
        const { lat, lng } = changes['selectedGym'].currentValue;
        this.map.setView(new Leaflet.LatLng(lat, lng), 14);
      } else {
        this.map.setView(this.originalLatLng, 12);
      }
    }
  }

}

export const getIcon = (): Leaflet.Icon => { // On crée une icône pour les marqueurs de la carte.
  return new Leaflet.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};

export const getMarkersFromGyms = (gyms: Gym[], map: Leaflet.Map, icon: Leaflet.Icon, event: EventEmitter<Gym>): Leaflet.Marker[] => gyms.map(({ lat, lng, name }: Gym) => new Leaflet.Marker(
  new Leaflet.LatLng(lat, lng), {
    icon: icon,
    title: name
  } as Leaflet.MarkerOptions
).on('click', () => {
  // map.setView(new Leaflet.LatLng(lat, lng), 18);
  event.emit({ lat, lng, name } as Gym);
  console.log('Gym sélectionnée:', name);
})

); // Notre type GYM permets de pouvoir effectuer cela directement.