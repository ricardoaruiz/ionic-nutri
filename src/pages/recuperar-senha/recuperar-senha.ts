import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavegacaoProvider } from '../../providers/navegacao/navegacao';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  public recuperarSenhaForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private nav: NavegacaoProvider,
              private auth: AuthProvider,
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
          this.nav.setRoot(HomePage);
        });

        alert.present();
          
      })
      .catch( (erro) => {
        this.auth.trataErroEnvioEmailResetSenha(erro);
      });
  }

  voltar() {
    this.nav.setRoot(HomePage);
  }

}
