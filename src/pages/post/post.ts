import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { WordpressService } from './../../services/wordpress.service';
import { NavegacaoService } from './../../services/navegacao.service';

import { Post } from '../../services/model/post.model';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  public post;
  public user: string;
  public categories: Array<any> = new Array<any>();

  constructor(private navParams: NavParams,
              private nav: NavegacaoService,
              private wordpressService : WordpressService,
              private loagindCtrl: LoadingController) {
  }

  ionViewDidLoad(){
    
    let loading = this.loagindCtrl.create({content: 'Carregando...'});
    loading.present();

    this.post = this.navParams.get('item');

    Observable.forkJoin(
      this.obtemDadosAutor(),
      this.obtemDadosCategorias()
    ).subscribe( data => {
      console.log(data);
      this.user = data[0].name;
      this.categories = data[1];
      loading.dismiss();
    });

  }

  obtemDadosAutor() {
    return this.wordpressService.obtemAutor(this.post.author);
  }

  obtemDadosCategorias() {
    return this.wordpressService.obtemCategorias(this.post);
  }

  voltar() {
    this.nav.popFromActiveNav();
  }
}
