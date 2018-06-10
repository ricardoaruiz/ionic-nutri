import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginPage } from '../login/login';
import { DicasPage } from '../dicas/dicas';

import { AuthProvider } from '../../providers/auth/auth';
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
          this.auth.trataErroCadastroEmailSenha(error);
        });
  }

  voltar() {
    this.nav.setRoot(LoginPage);
  }

  private trataSucesso(data) {
    this.toastCtrl.create({
      message: 'Cadastro realizado com sucesso.',
      duration: 3000,
      position: 'bottom'
    }).present();
    this.nav.setRoot(DicasPage);
  }

}
