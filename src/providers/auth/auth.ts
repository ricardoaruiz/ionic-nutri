import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';


@Injectable()
export class AuthProvider {

  constructor(private fireAuth: AngularFireAuth) {
    
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
   * Cria um usuário no Firebase utilizando o método Email e Senha.
   * @param email 
   * @param senha 
   */
  public criarUsuarioComEmailESenha(email: string, senha: string) : Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, senha);
  }

}
