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

  public fotoPerfil: boolean = false;

  public facebook = {
    nome: '',
    email: '',
    fotoUrl: ''
  }

  constructor(private nav: NavegacaoProvider, 
              private auth: AuthProvider) {
    this.facebook.email = this.auth.getUsuarioLogado().email;
    this.facebook.nome = this.auth.getUsuarioLogado().displayName;
    this.facebook.fotoUrl = this.auth.getUsuarioLogado().photoURL;

    if (this.facebook.fotoUrl === null) {
      this.fotoPerfil = false;
    } else {
      this.fotoPerfil = true;
    }

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
