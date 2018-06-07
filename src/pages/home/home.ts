import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DicasPage } from '../dicas/dicas';

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
          this.navegacao.setRoot(DicasPage, false);
          loading.dismiss();
        })
        .catch( (erro) => {
          this.auth.trataErroLogin(erro);
          loading.dismiss();
        });
  }

  registrar() {
    this.navegacao.setRoot(RegistroPage);
  }

}
