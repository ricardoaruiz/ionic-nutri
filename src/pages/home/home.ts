import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DicasPage } from './../dicas/dicas';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';

import { NavegacaoService } from '../../services/navegacao.service';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public dicasPage = DicasPage;
  public perfilPage = PerfilPage

  constructor(private nav: NavegacaoService, 
              private auth: AuthService) {
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
