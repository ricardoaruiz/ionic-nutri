import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Paginas
import { MyApp } from './app.component';

import { HomePageModule } from './../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { DicasPageModule } from '../pages/dicas/dicas.module';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { RecuperarSenhaPageModule } from '../pages/recuperar-senha/recuperar-senha.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';

// Services
import { AuthService } from '../services/auth.service';
import { NavegacaoService } from '../services/navegacao.service';
import { WordpressService } from '../services/wordpress.service';

const firebaseConfig = {
  apiKey: "AIzaSyAFqjLYrM6wWQKuflEd5BM_fqgbMghqzlQ",
  authDomain: "nutri-69711.firebaseapp.com",
  databaseURL: "https://nutri-69711.firebaseio.com",
  projectId: "nutri-69711",
  storageBucket: "nutri-69711.appspot.com",
  messagingSenderId: "910605714687"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    HttpModule,
    DicasPageModule,
    LoginPageModule,
    RegistroPageModule,
    RecuperarSenhaPageModule,
    PerfilPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    NavegacaoService,
    WordpressService
  ]
})
export class AppModule {}
