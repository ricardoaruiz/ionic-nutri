import { Component, ViewChild } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
import { DicasPage } from '../dicas/dicas';
import { RegistroPage } from '../registro/registro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { NavegacaoProvider } from './../../providers/navegacao/navegacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private navegacao: NavegacaoProvider,
              private auth: AuthProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    }); 
  }

  ionViewDidEnter(){
    this.loginForm.reset();
  }

  entrar() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });

    loading.present();

    this.auth.loginComEmail(
      this.loginForm.get('email').value, 
      this.loginForm.get('password').value)
        .then( (sucesso) => {
          this.trataSucesso(sucesso);
          loading.dismiss();
        })
        .catch( (erro) => {
          this.trataErro(erro);
          loading.dismiss();
        });
  }

  registrar() {
    this.navegacao.setRoot(RegistroPage);
  }

  private trataSucesso(sucesso) {
    this.navegacao.setRoot(DicasPage, false);
  }

  private trataErro(erro) {
    let mensagemErro: string;

    switch (erro.code) {
      case 'auth/invalid-email':
        mensagemErro = 'O email informado não é válido.';
        break;    
      case 'auth/user-disabled':
        mensagemErro = 'O usuário informado não está ativo.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        mensagemErro = 'Email ou senha informados são inválidos';
        break;
      default:
        mensagemErro = 'Erro inesperado. Tente novamente mais tarde.';
        break;
    }

    this.alertCtrl.create({
      message: mensagemErro,
      title: 'Login',
      buttons: ['Ok']
    }).present();

  }

}
