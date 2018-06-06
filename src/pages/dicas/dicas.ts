import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  public email: string;

  constructor(private navCtrl: NavController, 
              private auth: AuthProvider) {
    this.email = this.auth.getUsuarioLogado().email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  sair() {
    this.auth.logoff()
      .then( () => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch( (error) => {
        console.log('Erro ao realizar o logoff');
      })
  }

}
