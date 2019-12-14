# Meu-Uber-Clone
Este repositório contém uma implementação da interface gráfica básica do aplicativo Uber.

## Instalando
  $ git clone https://github.com/deusimardamiao/meu-uber-clone.git
  
  $ cd meu-uber-clone/
  
  $ npm install
  
  Depois que instalar todas as dependências, acesse a [API do Google Maps](https://developers.google.com/maps/documentation/android-api/signup) para gerar sua APY_KEY.

  Com ela em mãos, crie um arquivo chamado .env na raiz do projeto e adicione a seguinte linha:

  APY_KEY=SUA_CHAVE

  No arquivo android/app/src/main/AndroidManifest.xml localize a linha 17 e substitua APY_KEY por sua chave.

  Para executar no emulador Android

  $ react-native run-android

  Para executar no emulador Ios
  
  $ react-native run-ios