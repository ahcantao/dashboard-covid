import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'heatmap.js';
import 'leaflet-heatmap';
declare var HeatmapOverlay: any;
import { HttpClient } from '@angular/common/http';

// import HeatmapOverlay from 'leaflet-heatmap';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {


  json;

  constructor(private http: HttpClient) {


  }


  HMData = {
    max: 112,
    data: [
      { lat: -21.1379559, lng: -48.9752072, count: 112, bairro: 'Centro' },
      { lat: -21.126594, lng: -48.9699396, count: 61, bairro: 'Higienópolis' },
      { lat: -21.1339097, lng: -48.9628949, count: 59, bairro: 'São Francisco' },
      { lat: -21.1466013, lng: -48.9399593, count: 55, bairro: 'Bom Pastor ' },
      { lat: -21.1528555, lng: -48.9739841, count: 53, bairro: 'Vila Sotto' },
      { lat: -21.142134, lng: -48.9647028, count: 48, bairro: 'Prq Iracema' },
      { lat: -21.1254463, lng: -49.0192301, count: 48, bairro: 'Nova Catanduva 1 ' },
      { lat: -21.1413269, lng: -48.9467258, count: 45, bairro: 'Loteamento Solo Sagrado' },
      { lat: -21.166044, lng: -48.9697166, count: 43, bairro: 'Cidade Jardim' },
      { lat: -21.1171114, lng: -48.9719408, count: 41, bairro: 'Jardim Salles' },
      { lat: -21.1264296, lng: -48.9963973, count: 40, bairro: 'Parque Residencial Flamingo' },
      { lat: -21.1451935, lng: -48.9898584, count: 39, bairro: 'Agudo Romão ' },
      { lat: -21.1405336, lng: -48.9949894, count: 38, bairro: 'Martani' },
      { lat: -21.1422301, lng: -49.0015708, count: 27, bairro: 'Loteamento Parque José Cury' },
      { lat: -21.1422301, lng: -49.0015708, count: 27, bairro: 'José Curi' },
      { lat: -21.1469831, lng: -48.9949314, count: 25, bairro: 'Jardim Del Rey' },
      { lat: -21.1324168, lng: -48.9533112, count: 25, bairro: 'Jardim Vertoni' },
      { lat: -21.131428, lng: -49.0204391, count: 24, bairro: 'Jardim Imperial' },
      { lat: -21.1457857, lng: -48.9681015, count: 23, bairro: 'Vila Celso' },
      { lat: -21.1374272, lng: -48.9475549, count: 22, bairro: 'Conj. Euclides' },
      { lat: -21.1562747, lng: -48.9662687, count: 21, bairro: 'Parque Residencial Paraíso' },
      { lat: -21.1246503, lng: -48.9754295, count: 20, bairro: 'Vila Motta' },
      { lat: -21.137568, lng: -48.957786, count: 20, bairro: 'Jardim Santa Rosa' },
      { lat: -21.1437523, lng: -49.0015759, count: 20, bairro: 'Agudo Romão II' },
      { lat: -21.1286129, lng: -48.9565274, count: 19, bairro: 'Bela Vista' },
      { lat: -21.1231302, lng: -48.9402222, count: 19, bairro: 'Gloria VI' },
      { lat: -21.1540304, lng: -48.9872515, count: 18, bairro: 'Parque Joaquim Lopes ' },
      { lat: -21.134828, lng: -48.9821828, count: 18, bairro: 'Vila Rodrigues' },
      { lat: -21.1605431, lng: -48.9768902, count: 18, bairro: 'Jardim Alpino' },
      { lat: -21.1262634, lng: -48.9561077, count: 16, bairro: 'Pq. Glória' },
      { lat: -21.1458785, lng: -48.9819217, count: 16, bairro: 'Jd Amêndola' },
      { lat: -21.1599265, lng: -48.9701537, count: 15, bairro: 'Monte Líbano' },
      { lat: -21.1294581, lng: -49.0143398, count: 15, bairro: 'Gabriel Hernandes' },
      { lat: -21.1390409, lng: -48.9848143, count: 14, bairro: 'Santo Antônio' },
      { lat: -21.1306897, lng: -48.993836, count: 13, bairro: 'Giorgiano Mestrinelli' },
      { lat: -21.124763, lng: -48.953635, count: 13, bairro: 'Parque Gloria II' },
      { lat: -21.1179631, lng: -48.9610789, count: 13, bairro: 'Jardim Caparroz' },
      { lat: -21.1548513, lng: -48.9388901, count: 13, bairro: 'Pachá' },
      { lat: -21.1610341, lng: -48.9428049, count: 13, bairro: 'Conjunto Habitacional Prefeito Pedro Nechar' },
      { lat: -21.139698, lng: -48.9521787, count: 12, bairro: 'Jd São Domingos' },
      { lat: -21.1528723, lng: -48.9418241, count: 11, bairro: 'Pachá II' },
      { lat: -21.1207995, lng: -48.9486141, count: 11, bairro: 'Sebastião Moraes' },
      { lat: -21.1359918, lng: -48.9927432, count: 11, bairro: 'Vila Engrácia' },
      { lat: -21.1254931, lng: -48.9455499, count: 11, bairro: 'Gloria V' },
      { lat: -21.1162867, lng: -48.9587068, count: 9, bairro: 'Colina Do Sol' },
      { lat: -21.144863, lng: -48.9484981, count: 9, bairro: 'Solo Sagrado II' },
      { lat: -21.1274963, lng: -48.9858899, count: 8, bairro: 'Jardim Paulista ' },
      { lat: -21.1693926, lng: -49.0000412, count: 8, bairro: 'Jardim Dos Coqueiros' },
      { lat: -21.1127917, lng: -48.9655023, count: 8, bairro: 'Novo Tarraf' },
      { lat: -21.1275048, lng: -48.9636192, count: 8, bairro: 'Jardim Do Bosque' },
      { lat: -21.1235083, lng: -48.9534364, count: 8, bairro: 'Parque Gloria III' },
      { lat: -21.1237242, lng: -49.0169254, count: 8, bairro: 'Júlio Ramos' },
      { lat: -21.1288958, lng: -48.9580767, count: 8, bairro: 'Loteamento Cerradinho' },
      { lat: -21.1513216, lng: -48.9679042, count: 8, bairro: 'Jardim América' },
      { lat: -21.1531344, lng: -48.9378483, count: 8, bairro: 'Conjunto Habitacional Giuseppe Spina' },
      { lat: -21.1350525, lng: -48.9569212, count: 8, bairro: 'Vila Alexandria' },
      { lat: -21.150396, lng: -48.981411, count: 7, bairro: 'Juca Pedro' },
      { lat: -21.1105633, lng: -48.9599671, count: 7, bairro: 'Res Júlia Caparroz' },
      { lat: -21.1312004, lng: -48.9939825, count: 7, bairro: 'Conjunto Habitacional Deputado Antônio Mastrocola' },
      { lat: -21.1379711, lng: -48.9464209, count: 7, bairro: 'Cj Euclides II' },
      { lat: -21.1213844, lng: -48.9511459, count: 7, bairro: 'Parque Glória IV' },
      { lat: -21.1612046, lng: -48.9643781, count: 7, bairro: 'Alto Da Boa Vista' },
      { lat: -21.1121421, lng: -48.955683, count: 7, bairro: 'Jardim Pedro Borgonove' },
      { lat: -21.158759, lng: -48.9915745, count: 7, bairro: 'Pedro Monteleone ' },
      { lat: -21.1264159, lng: -48.9486187, count: 7, bairro: 'Nosso Teto' },
      { lat: -21.1581702, lng: -48.995294, count: 7, bairro: 'Luminar' },
      { lat: -21.1203485, lng: -48.9837617, count: 6, bairro: 'Theodoro R Filho' },
      { lat: -21.1144464, lng: -48.9664264, count: 6, bairro: 'Tarraf' },
      { lat: -21.1329201, lng: -48.9593369, count: 6, bairro: 'Jardim Augusta' },
      { lat: -21.1285601, lng: -48.9819753, count: 6, bairro: 'Vila Guzzo' },
      { lat: -21.1298032, lng: -48.9894229, count: 6, bairro: 'Jardim Ipanema' },
      { lat: -21.1218329, lng: -48.9646157, count: 6, bairro: 'Lunardeli ' },
      { lat: -21.14894, lng: -48.9447938, count: 5, bairro: 'Jardim Eldorado' },
      { lat: -21.1511627, lng: -48.9634025, count: 5, bairro: 'Irradiação' },
      { lat: -21.1555392, lng: -48.9812733, count: 5, bairro: 'Jd Primavera' },
      { lat: -21.1317032, lng: -48.9969898, count: 5, bairro: 'Gavioli' },
      { lat: -21.115074, lng: -48.9665693, count: 4, bairro: 'Parque Residencial Maria L P F' },
      { lat: -21.1356254, lng: -48.9881461, count: 4, bairro: 'Jardim Do Lago' },
      { lat: -21.1166197, lng: -48.9659932, count: 4, bairro: 'Loteamento Altos Do Higienópolis' },
      { lat: -21.1192004, lng: -48.9671997, count: 4, bairro: 'Vila Bela' },
      { lat: -21.1391706, lng: -49.0005608, count: 4, bairro: 'Jardim Santa Paula' },
      { lat: -21.1245482, lng: -48.9830392, count: 4, bairro: 'Vila São Luiz       ' },
      { lat: -21.1647785, lng: -48.9743945, count: 4, bairro: 'Conjunto Habitacional Prefeito João Righini' },
      { lat: -21.1575995, lng: -48.9750912, count: 3, bairro: 'Cecap' },
      { lat: -21.1583197, lng: -48.9817282, count: 3, bairro: 'Residencial Granville' },
      { lat: -21.1398791, lng: -48.9899787, count: 3, bairro: 'Residencial Isabela' },
      { lat: -21.1460173, lng: -48.9772624, count: 3, bairro: 'Jardim Brasil' },
      { lat: -21.1490001, lng: -48.9372869, count: 3, bairro: 'Residencial Dos Ipês' },
      { lat: -21.1219006, lng: -49.0161118, count: 3, bairro: 'Nova Catanduva II ' },
      { lat: -21.1494052, lng: -48.9623931, count: 3, bairro: 'Jardim Santa Helena' },
      { lat: -21.1265492, lng: -49.0091743, count: 3, bairro: 'Distrito Industrial' },
      { lat: -21.1469784, lng: -48.9646932, count: 3, bairro: 'Loteamento Jorge Mauad' },
      { lat: -21.1334704, lng: -48.9544537, count: 3, bairro: 'Residencial Chiodini' },
      { lat: -21.1487872, lng: -48.9836505, count: 2, bairro: 'Jardim Aeroporto' },
      { lat: -21.1584828, lng: -48.9435857, count: 2, bairro: 'Conjunto Habitacional Pedro Luis Boso' },
      { lat: -21.1216607, lng: -48.9760376, count: 2, bairro: 'Monte Carlo' },
      { lat: -21.1211866, lng: -48.9452638, count: 2, bairro: 'Res J Carvalho' },
      { lat: -21.1205112, lng: -48.9668986, count: 2, bairro: 'Residencial Lunardelli' },
      { lat: -21.1297813, lng: -48.9516076, count: 2, bairro: 'Jardim Esperança' },
      { lat: -21.1520679, lng: -48.964809, count: 2, bairro: 'Loteamento Nações Unidas' },
      { lat: -21.1356251, lng: -49.0050392, count: 1, bairro: 'Jardim Shangri-Lá' },
      { lat: -21.1649408, lng: -48.9375788, count: 1, bairro: 'Jardim Oriental' },
      { lat: -21.127957, lng: -48.9514991, count: 1, bairro: 'Conjunto Habitacional Carlos Alberto Magalhães' },
      { lat: -21.1186081, lng: -48.9804922, count: 1, bairro: 'Acapulco' },
      { lat: -21.1346895, lng: -49.009138, count: 1, bairro: 'Jard Alvorada' },
      { lat: -21.1940187, lng: -49.0063871, count: 1, bairro: 'Km 7' },
      { lat: -21.1444259, lng: -48.9954949, count: 1, bairro: 'Residencial Top Life' },
      { lat: -21.1352412, lng: -48.9897452, count: 1, bairro: 'Residencial Primavera' },
      { lat: -21.1328173, lng: -48.984503, count: 1, bairro: 'Vila Stocco' },
      { lat: -21.1274742, lng: -49.0126073, count: 1, bairro: 'Orlando Facci' },
      { lat: -21.1229656, lng: -48.9704204, count: 1, bairro: 'Vila Jorge' },
      { lat: -21.1288958, lng: -48.9704208, count: 1, bairro: 'Vila São Jorge' },
      { lat: -21.1800442, lng: -49.0038612, count: 1, bairro: 'Coqueiros 2' },




    ]
  };


  // cfg = {
  //   // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  //   // if scaleRadius is false it will be the constant radius used in pixels
  //   "radius": .01,
  //   "maxOpacity": .6,
  //   // scales the radius based on map zoom
  //   "scaleRadius": true,
  //   // if set to false the heatmap uses the global maximum for colorization
  //   // if activated: uses the data maximum within the current map boundaries
  //   //   (there will always be a red spot with useLocalExtremas true)
  //   "useLocalExtrema": true,
  //   // which field name in your data represents the latitude - default "lat"
  //   latField: 'lat',
  //   // which field name in your data represents the longitude - default "lng"
  //   lngField: 'lng',
  //   // which field name in your data represents the data value - default "value"
  //   valueField: 'count'
  // };



  heatmapLayer = new HeatmapOverlay({
    radius: 0.005,
    // radius: 100,
    maxOpacity: 0.8,
    scaleRadius: true,
    useLocalExtrema: true,
    blur: .5,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count',
    // maxOpacity: .8,
    // minOpacity: 0,

    gradient: {
      // enter n keys between 0 and 1 here
      // for gradient color customization
      '.10': 'blue',
      '.23157895': 'green',
      '.394736842': 'yellow',
      '.526315789': 'red'
    }


  });

  options = {
    layers: [
      L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
        maxZoom: 15,
        attribution: "Casos confirmados em Catanduva/SP | Atualizado em 04/08/2020 | Fonte: Ministério da Saúde"
      }),
    ],

    zoom: 14,
    center: L.latLng(-21.13778, -48.97278)
  };


  onEachFeature(feature, layer) {
    //bind click
    layer.on('click', function (e) {
      // e = event
      console.log(feature.properties['NM_BAIRRO']);
      // You can make your ajax call declaration here
      //$.ajax(...
    });

  }




  onMapReady(map) {


    this.http.get('assets/heatmap/Catanduva.geojson').subscribe((json: any) => {
      console.log(json);
      this.json = json;

      let bairros =  L.geoJSON(this.json, {
        style: {
          color: "#333",
          opacity: 0.1,
          weight: 2,
          fillColor: "#ccc",
          fillOpacity: 0,
        },

        onEachFeature: this.onEachFeature
      });

    bairros.addTo(map).bringToBack();


    });



    this.heatmapLayer.setData(this.HMData);
    this.heatmapLayer.onAdd(map);


    for (let i=0; i<this.HMData['data'].length;i++){
      let lat = this.HMData['data'][i]['lat'];
      let lng = this.HMData['data'][i]["lng"];
      let count = this.HMData['data'][i]["count"];
      let bairro = this.HMData['data'][i]["bairro"];

      let circle = new L.Circle(L.latLng(lat, lng), {
        color: "#21afdd",
        fillColor: "#21afdd",
        fillOpacity: 0.5,
        radius: 100
      });

      map.addLayer(circle);

      circle.bindPopup(bairro + ": " + count + " confirmados");

      // console.log(lat + " " + lng + " " + count);
    }



  }

}
