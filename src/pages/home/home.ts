import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DicasPage } from './../dicas/dicas';
import { PerfilPage } from '../perfil/perfil';
import { NavegacaoProvider } from '../../providers/navegacao/navegacao';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public dicasPage = DicasPage;
  public perfilPage = PerfilPage

  constructor(private nav: NavegacaoProvider, 
              private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  sair() {
    this.auth.logoff()
      .then( () => {
        this.nav.setRoot(LoginPage);
      })
      .catch( (error) => {
        console.log('Erro ao realizar o logoff');
      })
  }  

}
