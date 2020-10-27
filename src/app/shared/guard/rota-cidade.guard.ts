import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import CITY_CODES from "../utils/cities"

@Injectable({
  providedIn: 'root'
})
export class RotaCidadeGuard implements CanActivate {

  public cityCodes = CITY_CODES;
  cityName;
  state;
  found = false;


  constructor(private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const stateUrl = state.url;
    const splitStateUrl = stateUrl.split('/');
    const goToPage =  splitStateUrl[1];

    this.cityName = next.params.cityName.toLowerCase();

    if (this.cityName in this.cityCodes){
      this.found = true;
      this.state = this.cityCodes[this.cityName].estado.toLowerCase();
    }

    if (this.found){
      this.router.navigate([`/${goToPage}/${this.state}/${this.cityName}`]);
    } else{
      this.router.navigate([`/`]);
    }

    return true;
  }
  
}
