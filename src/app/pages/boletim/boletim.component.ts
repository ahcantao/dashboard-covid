import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GetdataService} from '../../core/services/getdata.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import html2canvas from 'html2canvas';
import {DatePipe} from '@angular/common';
import CITY_CODES from "../../shared/utils/cities"


@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.scss']
})
export class BoletimComponent implements OnInit {

  cityPath: string;
  cityName: string;
  state: string;


  cityNameBoletim: string;
  stateBoletim: string;
  lastGenerated;

  estimatedPopulation2020: number;

  totalConfirmed='0';
  totalCured = '0';
  totalActive = '0';
  totalHospitalized = '0';
  todayActive = '0';
  todayDeath='0';
  totalNotified='0';
  totalSuspect='0';
  totalDeath='0';

  todayTotalActive='0';
  todayTotalConfirmed='0';
  todayTotalCured='0';
  todayTotalDiscarded='0';
  todayTotalHospitalized='0';
  todayTotalNotified='0';
  todayTotalSuspect='0';
  totalDiscarded = '0';
  todayTotalDeath = '0';
  lastUpdate;

  isLoading = true;
  isSmallScreen = false;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('boletim') boletim: ElementRef;
  @ViewChild('downloadLinkBoletim') downloadLinkBoletim: ElementRef;


  route$: Subscription;

  public cityCodes = CITY_CODES;



  constructor(private _getDataService: GetdataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (window.innerWidth < 991.98){
      this.isSmallScreen = true;
    }

    this.lastGenerated = new Date();

    this.route$ = this.route.params.subscribe(routeParams => {

      // this.ngOnDestroy();

      this.isLoading = true;
      this.state = this.route.snapshot.params['state'].toLowerCase();
      this.cityName = this.route.snapshot.params['cityName'].toLowerCase();
      this.cityPath = this.cityName;

      if (this.cityName in this.cityCodes){
        this.state = this.cityCodes[this.cityName].estado.toLowerCase();
        this.cityName = this.cityCodes[this.cityName].cidade.toLowerCase();
      }

      this.reload();



    })

  }

  downloadImage(){

    // this.boletim.nativeElement.style.marginTop = "0";
    // this.boletim.nativeElement.style.marginBottom = "0";
    this.boletim.nativeElement.style.marginLeft = "0";
    this.boletim.nativeElement.style.marginRight = "0";


    // window.scrollTo(0, 0);
    html2canvas(this.boletim.nativeElement,

        {

          scrollX: 0,
          scrollY: -window.scrollY,
          allowTaint: true,
          backgroundColor: '#282e38'

        }
        ).then(canvas => {

      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLinkBoletim.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLinkBoletim.nativeElement.download = `${this.lastUpdate}-${this.state}-${this.cityName}.png`;
      this.downloadLinkBoletim.nativeElement.click();


    });

    this.boletim.nativeElement.style.marginLeft = "auto";
    this.boletim.nativeElement.style.marginRight = "auto";
  }

  generateText(){

    let postagem = '';
    const datePipe = new DatePipe('pt-BR');


    const taxaLetalidade = (parseInt(this.totalDeath)/parseInt(this.totalConfirmed)* 100).toFixed(1);
    const taxaCurado = (parseInt(this.totalCured)/parseInt(this.totalConfirmed)* 100).toFixed(1);

    const populacao = this.estimatedPopulation2020;
    const incidencia100KHabitantes = ((parseInt(this.totalConfirmed) * 10**5)/populacao).toFixed(2);
    const mortalidade100KHabitantes = ((parseInt(this.totalDeath) * 10**5)/populacao).toFixed(2);

    postagem += `📈 PI-COVID - Boletim do Coronavírus de ${datePipe.transform(this.lastUpdate, "dd/MM/yyyy")} 🦠\n`;

    postagem += `⠀\n`;

    postagem += `✔️ Confirmados: ${this.totalConfirmed} (${this.todayTotalConfirmed})\n`;
    postagem += `😷 Ativos: ${this.totalActive} (${this.todayTotalActive})\n`;
    postagem += `🙌 Curados: ${this.totalCured} (${this.todayTotalCured})\n`;

    postagem += `⠀\n`;

    postagem += `📋 Notificados: ${this.totalNotified} (${this.todayTotalNotified})\n`;
    postagem += `🔎 Suspeitos: ${this.totalSuspect} (${this.todayTotalSuspect})\n`;
    postagem += `❌ Descartados: ${this.totalDiscarded} (${this.todayTotalDiscarded})\n`;

    postagem += `⠀\n`;

    postagem += `🏥 Internados: ${this.totalHospitalized} (${this.todayTotalHospitalized})\n`;
    postagem += `😢 Óbitos: ${this.totalDeath} (${this.todayTotalDeath})\n`;

    // postagem += `⠀\n`;

    // postagem += `Leitos de UTI exclusivos para Covid-19 nos hospitais da cidade: 37\n`;


    postagem += `⠀\n`;

    postagem += `📊 Confirmados acumulados de COVID-19 por 100 mil habitantes: ${incidencia100KHabitantes}\n`;
    postagem += `📊 Óbitos acumulados de COVID-19 por 100 mil habitantes: ${mortalidade100KHabitantes}\n`;
    postagem += `📊 Taxa de letalidade: ${taxaLetalidade}%\n`;
    postagem += `📊 ${taxaCurado}% dos pacientes confirmados foram curados\n`;

    postagem += `⠀\n`;

    postagem += `Acesse picovid.com.br\n`;
    postagem += `Fonte: Prefeitura de ${this.titleCase(this.cityName)}/${this.state.toUpperCase()}\n`;

    postagem += `⠀\n`;

    postagem += `📆 Atualizado em ${datePipe.transform(this.lastGenerated, "dd/MM/yyyy, 'às' HH:mm")}\n`;

    postagem += `⠀\n`;

    postagem += `#AgradeçoAosProfissionaisDaSaúde #UseMáscara #LaveAsMãos #SeCuide #VaiPassar #FiqueEmCasa #usemascara😷 #${this.cityName} #atencao #coronavirus #obitoeminvestigacao #obitoconfirmado #fiqueemcasa🏠 #espalheconscientizacao #usemascara #saude #saúde #covid19 #picovid #picovid${this.cityName}`

    return postagem
  }

  downloadText(){
    const postagem = this.generateText();
    var filename = `${this.lastUpdate}-${this.state}-${this.cityName}.txt`;
    // var filetype = "text/plain";

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(postagem));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

//
//     let a = document.createElement("a");
//     dataURI = "data:" + filetype +
//         ";base64," + btoa(fileContents);
//     a.href = dataURI;
//     a['download'] = filename;
//     var e = document.createEvent("MouseEvents");
// // Use of deprecated function to satisfy TypeScript.
//     e.initMouseEvent("click", true, false,
//         document.defaultView, 0, 0, 0, 0, 0,
//         false, false, false, false, 0, null);
//     a.dispatchEvent(e);
//     a.removeNode();

  }

   plusSign(_string){

    return (parseInt(_string) > 0 ? '+' : '') + _string;

  }

  reload(){
    this._getDataService.getCity(this.state, this.cityName).subscribe((arrayOfResults) => {
      arrayOfResults.map((res) => {
        this.lastUpdate = res.date;
        this.cityNameBoletim = this.titleCase(res.cityName);
        this.stateBoletim = res.state.toUpperCase();
        this.estimatedPopulation2020 = res.estimatedPopulation2020;

        this.totalActive = res.totalActive;
        this.todayTotalActive = this.plusSign(res.todayTotalActive);

        this.totalConfirmed = res.totalConfirmed;
        this.todayTotalConfirmed = this.plusSign(res.todayTotalConfirmed);

        this.totalCured = res.totalCured;
        this.todayTotalCured = this.plusSign(res.todayTotalCured);

        this.totalNotified = res.totalNotified;
        this.todayTotalNotified = this.plusSign(res.todayTotalNotified);

        this.totalSuspect = res.totalSuspect;
        this.todayTotalSuspect = this.plusSign(res.todayTotalSuspect);

        this.totalDiscarded = res.totalDiscarded;
        this.todayTotalDiscarded = this.plusSign(res.todayTotalDiscarded);

        this.totalHospitalized = res.totalHospitalized;
        this.todayTotalHospitalized = this.plusSign(res.todayTotalHospitalized);

        this.totalDeath = res.totalDeath;
        this.todayTotalDeath = this.plusSign(res.todayTotalDeath);


      });

      this.isLoading = false;
    })
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

}
