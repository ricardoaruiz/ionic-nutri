import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

import { WordpressService } from '../../services/wordpress.service';
import { Post } from '../../services/model/post.model';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  posts: any[] = new Array<any>();
  morePagesAvailable: boolean = true;

  constructor(private wordpress: WordpressService,
              private loadingCtrl: LoadingController) {

  }

  ionViewWillEnter(){
   
    if (this.posts.length === 0) {
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpress.obtemPostsRecentes()
        .subscribe(
          (data: Post[]) => {
            data.forEach( (post: Post) => {
              post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<p>';
              this.posts.push(post);
            });
            console.log(this.posts);
            loading.dismiss();
          },
          error => {
            console.log('Erro ao obter as Postagens', error);
            loading.dismiss();
          }
        );
    }
    
  }

}
