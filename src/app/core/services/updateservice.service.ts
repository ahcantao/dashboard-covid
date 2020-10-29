import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import {interval} from 'rxjs';
@Injectable()
export class UpdateService {

  constructor(public updates: SwUpdate) {
    if (updates.isEnabled) {
      interval(1 * 20 * 1000).subscribe(() => updates.checkForUpdate()
          .then(() => console.log('checando por atualizações')));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('atualizando para nova versão');
    this.updates.activateUpdate().then(() => document.location.reload());
}
}
