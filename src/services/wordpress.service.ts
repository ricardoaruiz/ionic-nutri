import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../config';

@Injectable()
export class WordpressService {

    constructor(private http: Http) {

    }

    public obtemPostsRecentes(page: number = 1) {
        return this.http.get(Config.WORDPRESS_REST_API_URL + 'posts?page=' + page)
            .map( res => res.json() );
    }

    public obtemAutor(autor) {
        return this.http.get(Config.WORDPRESS_REST_API_URL + 'users/' + autor)
            .map( res => res.json() );
    }

    public obtemCategorias(post) {
        let observableBatch = [];

        post.categories.forEach(categoria => {
            observableBatch.push(this.obtemCategoria(categoria));
        });

        return Observable.forkJoin(observableBatch);
    }

    public obtemCategoria(categoria) {
        return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/" + categoria)
            .map( res => res.json());
    }

}