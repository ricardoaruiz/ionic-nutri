**Angular Fire**

    https://github.com/angular/angularfire2


**Facebook Ionic Native**

    Para instalar o plugin do Facebook (https://ionicframework.com/docs/native/facebook/)

        ```
        $ ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"
        ```

        ```
        $ npm install --save @ionic-native/facebook 
        ```

    Após instalar o plugin do Facebook e for rodar no device, caso dê um erro será necessário fazer:

        1 - Alterar o arquivo "\ionic-nutri\platforms\android\build.gradle", fazendo com que o repositório do Google
        seja sempre o primeiro da lista em todos os lugares que ele aparecer

        2 - Altear o arquivo "\ionic-nutri\platforms\android\app\src\main\res\values\strings.xml" acrescentando duas novas strings conforme abaixo:
            <string name="fb_app_id">123456789012345</string>
            <string name="fb_app_name">Curso_Ionic_Nutri</string>

        O passo 1 e 2 precisa ser feito sempre que o projeto for clonado, pois a plataforma não é versionada

    Para o app do Facebook precisa gerar o hash com o seguinte comando:

        ```
        keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | D:\devTools\openssl-0.9.8k_X64\bin\openssl sha1 -binary | D:\devTools\openssl-0.9.8k_X64\bin\openssl base64
        ```

    Se pedir a senha é "android"