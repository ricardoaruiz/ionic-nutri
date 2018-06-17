import { Component } from '@angular/core';
import { IonicPage, LoadingController, InfiniteScroll } from 'ionic-angular';

import { NavegacaoService } from './../../services/navegacao.service';
import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../services/model/post.model';

import { HomePage } from './../home/home';
import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  posts: any[] = new Array<Post>();
  morePagesAvailable: boolean = true;

  constructor(private wordpress: WordpressService,
              private nav: NavegacaoService,
              private loadingCtrl: LoadingController) {

  }

  ionViewWillEnter(){   
    if (this.posts.length === 0) {
      this.carregaPosts();
    }    
  }

  leiaMais(event, post) {
    this.nav.push(PostPage, {item: post});
  }

  doRefresh(refresher) {
    this.carregaPosts(refresher);
  }

  doInfinite(infinteScrool) {
    this.carregaPosts(undefined, infinteScrool);
  }  

  private carregaPosts(refresher?, infinteScrool?) {

    let loading = this.loadingCtrl.create({content : 'Carregando...'});
    let page = this.posts.length === 0 ? 1 : (Math.ceil(this.posts.length/10)) + 1;
    let isLoading = true;    

    if (refresher) {
      page = 1
      this.posts = [];
      this.morePagesAvailable = true;
    }

    if (!infinteScrool && !refresher) loading.present();

    this.wordpress.obtemPostsRecentes(page)
        .subscribe(
          (data: Post[]) => {
            data.forEach( (post: Post) => {
              if (infinteScrool && !isLoading) {
                infinteScrool.complete();
              }
              post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<p>';
              this.posts.push(post);
              isLoading = false;
            });
            if (!refresher ) {
              loading.dismiss();
            } else  {
              refresher.complete();
            }
          },
          error => {
            console.log('Erro ao obter as Postagens', error);
            if (!refresher ) {
              loading.dismiss();
            } else  {
              refresher.complete();
            }

            if (infinteScrool) {
              infinteScrool.complete();
              this.morePagesAvailable = false;
            }
          }
        );
  }

}
