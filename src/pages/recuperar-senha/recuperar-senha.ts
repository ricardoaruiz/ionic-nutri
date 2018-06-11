import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginPage } from '../login/login';

import { NavegacaoService } from '../../services/navegacao.service';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  public recuperarSenhaForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private nav: NavegacaoService,
              private auth: AuthService,
              private alertCtrl: AlertController) {

    this.recuperarSenhaForm = formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
    });
  }

  ionViewDidEnter(){
    this.recuperarSenhaForm.reset();
  }

  recuperarSenha() {
    const email = this.recuperarSenhaForm.controls['email'].value;
    this.auth.recuperarSenha(email)
      .then( () => {
        let alert = this.alertCtrl.create({
          message: `O email para troca de senha foi enviado para ${email}`,
          buttons: ['OK']
        });

        alert.onDidDismiss( data => {
          this.nav.setRoot(LoginPage);
        });

        alert.present();
          
      })
      .catch( (erro) => {
        this.auth.trataErroEnvioEmailResetSenha(erro);
      });
  }

  voltar() {
    this.nav.setRoot(LoginPage);
  }

}
