import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { NavegacaoProvider } from '../../providers/navegacao/navegacao';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  constructor(private nav: NavegacaoProvider, 
              private auth: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  sair() {
    this.auth.logoff()
      .then( () => {
        this.nav.setRoot(HomePage);
      })
      .catch( (error) => {
        console.log('Erro ao realizar o logoff');
      })
  }

}
