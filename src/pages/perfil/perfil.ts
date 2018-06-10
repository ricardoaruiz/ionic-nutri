import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { NavegacaoProvider } from './../../providers/navegacao/navegacao';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

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
    console.log('ionViewDidLoad PerfilPage');
  }

  public voltar() {
    this.nav.setRoot(HomePage);
  }

}
