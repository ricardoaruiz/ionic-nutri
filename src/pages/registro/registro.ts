import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DicasPage } from '../dicas/dicas';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { NavegacaoProvider } from '../../providers/navegacao/navegacao';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private nav: NavegacaoProvider,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
      });
  }
    
  ionViewDidEnter(){
    this.loginForm.reset();
  }

  registrar() {
    this.auth.criarUsuarioComEmailESenha(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value)
        .then(response => {
          this.trataSucesso(response);
        })
        .catch(error => {
          this.trataErro(error);
        });
  }

  voltar() {
    this.nav.setRoot(HomePage);
  }

  private trataSucesso(data) {
    this.toastCtrl.create({
      message: 'Cadastro realizado com sucesso.',
      duration: 3000,
      position: 'bottom'
    }).present();
    this.nav.setRoot(DicasPage);
  }

  private trataErro(error) {
    let mensagemErro: string;

    switch (error.code) {
      case 'auth/email-already-in-use':
        mensagemErro = 'O email informado já existe no cadastro.';
        break;
      case 'auth/invalid-email':
        mensagemErro = 'O email informado não é válido.';
        break;
      case 'auth/operation-not-allowed':
        mensagemErro = 'Método de cadastro não habilitado.';
        break;
      case 'auth/weak-password':
        mensagemErro = 'A senha informada não é forte o suficiente.';
        break;
      default:
        mensagemErro = 'Ocorreu um erro inesperado. Tente mais tarde.';
        break;
    }

    this.alertCtrl.create({
      title: 'Cadastro',
      message: mensagemErro,
      buttons: ['Ok']
    }).present();
  }

}
