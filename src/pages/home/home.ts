import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DicasPage } from '../dicas/dicas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('usuario')
  public email;

  @ViewChild('senha')
  public password;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController) {

  }

  entrar() {
    if (this.email.value === 'ricardo' && this.password.value == '123') {
      this.navCtrl.push(DicasPage);
    } else {
      this.toastCtrl.create({
        message: 'Usuário ou senha não encontrado',
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  }

}
