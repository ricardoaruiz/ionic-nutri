import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

import firebase, { FirebaseError } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(private fireAuth: AngularFireAuth,
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
    return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

  /**
   * Faz o logoff do Firebase
   */
  public logoff() : Promise<any> {
    return this.fireAuth.auth.signOut();
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
  public trataErroLogin(erro: FirebaseError) {
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

}
