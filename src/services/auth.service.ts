import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, Platform } from 'ionic-angular';

import firebase, { FirebaseError } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private facebook: Facebook,
              private platform: Platform,
              private alertCtrl: AlertController) {
    
  }

  /**
   * Faz o login com email e senha no Firebase
   * @param email email do usuário
   * @param senha senha do uruário
   */
  public loginComEmail(email: string, senha: string): Promise<any> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, senha);
  }
  
  /**
   * Faz o login com o facebook
   */
  public loginComFacebook(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['public_profile','email'])
      .then( (result: FacebookLoginResponse) => {
        return this.fireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken));
      });
    } else {
      return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    }
  }

  /**
   * Faz o login como anônimo
   */
  public loginVisitante(): Promise<any> {
    return this.fireAuth.auth.signInAnonymously();
  }

  /**
   * Faz o logoff do Firebase
   */
  public logoff() {
    return this.facebook.logout()
      .then (() => {
        return this.fireAuth.auth.signOut();
      })
      .catch( error => {
        if (error === 'cordova_not_available') {
          return this.fireAuth.auth.signOut();
        }
        Promise.reject(error);
      })
  }

  /**
   * Retorna um Observable para verificação
   */
  public authState(): Observable<User> {
    return this.fireAuth.authState;
  }

  /**
   * Retorna o usuario logado no Firebase
   */
  public getUsuarioLogado(): User {
    return this.fireAuth.auth.currentUser;
  }

  /**
   * Envia o email para recuperação de senha
   */
  public recuperarSenha(email: string): Promise<any> {    
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * Cria um usuário no Firebase utilizando o método Email e Senha.
   * @param email 
   * @param senha 
   */
  public criarUsuarioComEmailESenha(email: string, senha: string) : Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, senha);
  }

  /**
   * Trata os erros do login
   * @param erro 
   */
  public trataErroLoginEmail(erro: FirebaseError) {
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

  /**
   * Trata os erros do cadastro de usuário utilizando Email e senha.
   * @param erro 
   */
  public trataErroCadastroEmailSenha(erro: FirebaseError) {
    let mensagemErro: string;

    switch (erro.code) {
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

  /**
   * Trata os erros do envio de email para recuperar a senha.
   * @param erro 
   */
  public trataErroEnvioEmailResetSenha(erro: FirebaseError) {
    let mensagemErro: string;

    switch (erro.code) {
      case 'auth/invalid-email':
        mensagemErro = 'O email informado não é válido.';
        break;
      case 'auth/user-not-found':
        mensagemErro = 'O email informado não foi encontrado.';
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

  public trataErroLoginComFacebook(erro: FirebaseError) {
    let mensagemErro: string;

    switch (erro.code) {
      case 'auth/account-exists-with-different-credential':
        mensagemErro = 'Já existe uma conta com o email (verificar o tratamento a ser feito)';
        break;
      case 'auth/auth-domain-config-required':
        mensagemErro = 'Erro nas configurações de autenticação do aplicativo. Informe o problema.';
        break;
      case 'auth/cancelled-popup-request':
        mensagemErro = 'Mais de uma requisição foi realizada. Por favor faça a requisição e aguarde o resultado.';
        break;
      case 'auth/operation-not-allowed':
        mensagemErro = 'Tipo de autenticação não habilitado. Informe o problema.';
        break;
      case 'auth/operation-not-supported-in-this-environment':
        mensagemErro = 'Ambiente não suportado para o tipo de autenticação utilizada.';
        break;
      case 'auth/popup-blocked':
        mensagemErro = 'Verifique se o seu browser não está bloqueando a abertura de popups.';
        break;
      case 'auth/popup-closed-by-user':
        mensagemErro = 'O processo de autenticação foi interrompido pelo usuário.';
        break;
      case 'auth/unauthorized-domain':
        mensagemErro = 'O domínio do aplicativo não está autorizado. Informe o problema.';
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

  /**
   * Trata os erros do login com usuário anonimo
   * @param erro 
   */
  public trataErroLoginVisitante(erro: FirebaseError) {
    let mensagemErro: string;

    switch (erro.code) {
      case 'auth/operation-not-allowed':
        mensagemErro = 'O método de login como anônimo não está permitido no momento.';
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