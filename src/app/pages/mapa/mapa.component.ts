import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'heatmap.js';
import 'leaflet-heatmap';
declare var HeatmapOverlay: any;
// import HeatmapOverlay from 'leaflet-heatmap';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {


  HMData = {
    max: 32,
    data: [
      {lat: -21.1379559, lng:-48.9752072, count:32 },
      {lat: -21.1339097, lng:-48.9628949, count:17 },
      {lat: -21.1466013, lng:-48.9399593, count:14 },
      {lat: -21.1413269, lng:-48.9467258, count:13 },
      {lat: -21.126594, lng:-48.9699396, count:12 },
      {lat: -21.166044, lng:-48.9697166, count:11 },
      {lat: -21.1528555, lng:-48.9739841, count:10 },
      {lat: -21.142134, lng:-48.9647028, count:9 },
      {lat: -21.1437523, lng:-49.0015759, count:9 },
      {lat: -21.1451935, lng:-48.9898584, count:9 },
      {lat: -21.131428, lng:-49.0204391, count:9 },
      {lat: -21.1469831, lng:-48.9949314, count:8 },
      {lat: -21.1231302, lng:-48.9402222, count:7 },
      {lat: -21.1324168, lng:-48.9533112, count:6 },
      {lat: -21.1405336, lng:-48.9949894, count:5 },
      {lat: -21.1264296, lng:-48.9963973, count:5 },
      {lat: -21.134828, lng:-48.9821828, count:4 },
      {lat: -21.1246503, lng:-48.9754295, count:4 },
      {lat: -21.1359918, lng:-48.9927432, count:4 },
      {lat: -21.1207995, lng:-48.9486141, count:4 },
      {lat: -21.1254463, lng:-49.0192301, count:4 },
      {lat: -21.1254931, lng:-48.9455499, count:4 },
      {lat: -21.1264159, lng:-48.9486187, count:4 },
      {lat: -21.1171114, lng:-48.9719408, count:4 },
      {lat: -21.1334704, lng:-48.9544537, count:3 },
      {lat: -21.1528723, lng:-48.9418241, count:3 },
      {lat: -21.1235083, lng:-48.9534364, count:3 },
      {lat: -21.1610341, lng:-48.9428049, count:3 },
      {lat: -21.1422301, lng:-49.0015708, count:3 },
      {lat: -21.1599265, lng:-48.9701537, count:3 },
      {lat: -21.1306897, lng:-48.993836, count:3 },
      {lat: -21.1179631, lng:-48.9610789, count:3 },
      {lat: -21.1286129, lng:-48.9565274, count:3 },
      {lat: -21.1605431, lng:-48.9768902, count:3 },
      {lat: -21.1317032, lng:-48.9969898, count:3 },
      {lat: -21.1294581, lng:-49.0143398, count:3 },
      {lat: -21.1457857, lng:-48.9681015, count:2 },
      {lat: -21.137568, lng:-48.957786, count:2 },
      {lat: -21.1237242, lng:-49.0169254, count:2 },
      {lat: -21.158759, lng:-48.9915745, count:2 },
      {lat: -21.1105633, lng:-48.9599671, count:2 },
      {lat: -21.1121421, lng:-48.955683, count:2 },
      {lat: -21.1540304, lng:-48.9872515, count:2 },
      {lat: -21.1469784, lng:-48.9646932, count:2 },
      {lat: -21.1275048, lng:-48.9636192, count:2 },
      {lat: -21.1458785, lng:-48.9819217, count:2 },
      {lat: -21.1583197, lng:-48.9817282, count:2 },
      {lat: -21.1531344, lng:-48.9378483, count:2 },
      {lat: -21.1374272, lng:-48.9475549, count:2 },
      {lat: -21.1245482, lng:-48.9830392, count:1 },
      {lat: -21.150396, lng:-48.981411, count:1 },
      {lat: -21.1285601, lng:-48.9819753, count:1 },
      {lat: -21.1390409, lng:-48.9848143, count:1 },
      {lat: -21.1127917, lng:-48.9655023, count:1 },
      {lat: -21.1398791, lng:-48.9899787, count:1 },
      {lat: -21.115074, lng:-48.9665693, count:1 },
      {lat: -21.124763, lng:-48.953635, count:1 },
      {lat: -21.1548513, lng:-48.9388901, count:1 },
      {lat: -21.1219006, lng:-49.0161118, count:1 },
      {lat: -21.1520679, lng:-48.964809, count:1 },
      {lat: -21.1218329, lng:-48.9646157, count:1 },
      {lat: -21.1581702, lng:-48.995294, count:1 },
      {lat: -21.1298032, lng:-48.9894229, count:1 },
      {lat: -21.1494052, lng:-48.9623931, count:1 },
      {lat: -21.1562747, lng:-48.9662687, count:1 },
      {lat: -21.1511627, lng:-48.9634025, count:1 },
      {lat: -21.1693926, lng:-49.0000412, count:1 },
      {lat: -21.1329201, lng:-48.9593369, count:1 },
      {lat: -21.1513216, lng:-48.9679042, count:1 },
      {lat: -21.1262634, lng:-48.9561077, count:1 },
      {lat: -21.1379711, lng:-48.9464209, count:1 },
      {lat: -21.1647785, lng:-48.9743945, count:1 },
      {lat: -21.1575995, lng:-48.9750912, count:1 },
      {lat: -21.1162867, lng:-48.9587068, count:1 },
      {lat: -21.1612046, lng:-48.9643781, count:1 },
    ]
  };


  cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": .01,
    "maxOpacity": .6,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  };



  heatmapLayer = new HeatmapOverlay({
    radius: 0.01,
    maxOpacity: 0.6,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  });




  options = {
    layers: [
      L.tileLayer(
          "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
        maxZoom: 18,
        attribution: ""
      }),
    ],

    zoom: 14,
    center: L.latLng(-21.13778, -48.97278)
  };


  onMapReady(map) {

    this.heatmapLayer.setData(this.HMData);
    this.heatmapLayer.onAdd(map);
  }

}
