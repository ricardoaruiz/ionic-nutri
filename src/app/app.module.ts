import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicasPageModule } from '../pages/dicas/dicas.module';
import { DicasPage } from '../pages/dicas/dicas';
import { RegistroPageModule } from '../pages/registro/registro.module';

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
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    DicasPageModule,
    RegistroPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
