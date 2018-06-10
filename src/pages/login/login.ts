import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

import { AuthProvider } from '../../providers/auth/auth';
import { NavegacaoProvider } from './../../providers/navegacao/navegacao';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private navegacao: NavegacaoProvider,
              private auth: AuthProvider,
              private loadingCtrl: LoadingController) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    }); 
  }

  ionViewDidEnter(){
    this.loginForm.reset();
  }

  loginEmail() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });

    loading.present();

    this.auth.loginComEmail(
      this.loginForm.get('email').value, 
      this.loginForm.get('password').value)
        .then( (sucesso) => {
          this.navegacao.setRoot(HomePage, false);
          loading.dismiss();
        })
        .catch( (erro) => {
          this.auth.trataErroLoginEmail(erro);
          loading.dismiss();
        });
  }

  loginFacebook() {
    this.auth.loginComFacebook()
      .then ( (data) => {
        this.navegacao.setRoot(HomePage);
      })
      .catch ( (erro) => {
        this.auth.trataErroLoginComFacebook(erro);
      });
  }

  loginVisitante() {
    this.auth.loginVisitante()
      .then( data => {
        console.log('loginVisitante', data);
        this.navegacao.setRoot(HomePage);
      })
      .catch( erro => {
        this.auth.trataErroLoginVisitante(erro);
      });
  }

  registrar() {
    this.navegacao.setRoot(RegistroPage);
  }

  recuperarSenha() {
    this.navegacao.setRoot(RecuperarSenhaPage);
  }

}
