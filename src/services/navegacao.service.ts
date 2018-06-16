import { Injectable } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';

@Injectable()
export class NavegacaoService {

  private nav: NavController;

  constructor(private app: App,
              private loadCtrl: LoadingController) {
    this.nav = this.app.getActiveNav();
  }

  /**
   * Faz a navegação para outra página colocando na pilha para possivel retorno
   * @param page 
   * @param showLoading 
   */
  public push(page: any, params? : any, showLoading: boolean = true) {
    if (showLoading) {
      let load = this.loadCtrl.create({content: 'Carregando...'});
      load.present();
      this.nav.push(page, params).then( () => {
        load.dismiss();
      });
    } else {
      this.nav.push(page);
    }
  }
  
  /**
   * Faz a navegação para outra página como root
   * @param page 
   * @param showLoading 
   */
  public setRoot(page: any, params?: any, showLoading: boolean = true) {
    if (showLoading) {
      let load = this.loadCtrl.create({content: 'Carregando...'});
      load.present();
      this.nav.setRoot(page, params).then( () => {
        load.dismiss();
      });
    } else {
      this.nav.setRoot(page);
    }
  }

}
