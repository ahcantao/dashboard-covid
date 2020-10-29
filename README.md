<h1 align="center">PI-COVID</h1>
<h3 align="center">Painel Interativo sobre a COVID-19 (PI-COVID)</h3>

<p>

  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/rafaeldefazio/dashboard-covid" />
  </a>

</p>

<img alt="Página inicial" src="https://i.imgur.com/Gk76YJZ.png" />

### 🏠 [Repositório](https://github.com/rafaeldefazio/dashboard-covid/)

### ✨ [Página](https://picovid.com.br)


# API Endpoints

* https://api.picovid.com.br/timeline/{nome_do_estado}/{nome_cidade}
* https://api.picovid.com.br/cities/{nome_do_estado}/{nome_cidade}


## Changelog

### V4.1.2 (2020-10-28)
- Mudança no multiplicador de tempo da função interval() para ficar no padrao de segundos (s) ao invés de milissegundos (ms).

### V4.1.1 (2020-10-28)
- Mudança na fonte do boletim de Arial para Karla e Roboto
- Aumento da fonte para melhor enquandramento

### V4.1.0 (2020-10-28)
- Adicionado verificador de atualizaçao por ng-service-worker
- Correção de bug: preload de fonte

### V4.0.0 (2020-10-27)
- Adicionado AuthGuard para mapear cidades e respectivos estados em URLS amigáveis
- Alteração e organização da página "Sobre"
- Aviso sobre interatividade de gráficos adicionado

### V3.6.0 (2020-10-21)
- Adicionado arquivo para identificação de nome de cidades, a fim de viabilizar links personalizados

### V3.5.0 (2020-10-16)
- Adição de filtros
- Correção de bugs

### V3.4.0 (2020-10-13)
- Correção de bugs
- novos gráficos
- Adição bandeira de Pindorama/SP

### V3.3.0 (2020-09-23)

#### Novas funcionalidades e alterações:
- Adição de boletim diário online
- Download de boletim (png) e legenda (txt)

#### Correções e atualizações:
- Correção: botão de instalação de PWA não deve aparecer em dispositivos que já o instalaram



### V3.2.0 (2020-09-17)
#### Novas funcionalidades e alterações:
- Adição de título nas páginas
- Implementação de Lazy Loading nos painéis e informações técnicas
- Atualização de pacotes
- Mudança de picovid.com.br/ESTADO/CIDADE para picovid.com.br/painel/ESTADO/CIDADE
- Mudança da página inicial
- Gráfico diário modificado para StepLineSerie

### V3.1.0 (2020-09-12)
#### Novas funcionalidades e alterações:
- Gráfico de variações diárias passou a ser de colunas
- Adicionados cards de casos confirmados e óbitos por 100 mil habitantes
- Removido gráfico tipo radar, que representava a taxa de letalidade

### V3.0.0 (2020-09-11)
#### Novas funcionalidades:
- Atualização diária passou a ser feita diretamente pelo Google Sheets
- As cidades do PI-COVID passaram a ter painel próprio em picovid.com.br/ESTADO/CIDADE. Ex: picovid.com.br/sp/catanduva

### V2.4.0 (2020-09-04)

#### Novas funcionalidades:
- Criação da página /live

### V2.3.1 (2020-08-19)

#### Correções e atualizações:
- Mudança de URL de api de api.catanduva.org para api.picovid.com.br
- Mudança de nome: PI-COVID Catanduva/SP para PI-COVID
- mudança de .webmanifest
- mudança de URL canônico

### V2.3.0 (2020-08-18)
🎉 Agora PI-COVID está presente em Cravinhos/SP
 
#### Correções e atualizações:
- 404 passa a redirecionar para a página inicial

#### Novas funcionalidades:
- componente para exibição de dashboards incorporados do Google Data Studio
- adicionada página /cravinhos

### V2.2.1 (2020-08-15)

#### Correções e atualizações:
- URL para Twitter
- Mapa de calor de casos confirmados atualizado

#### Novas funcionalidades:
- Incorporação de dashboard do Google Data Studio em /analises
- Criação de página para informações técnicas em /informacoes-tecnicas

## Autores

👤 **Rafael Biagioni de Fazio**
* E-mail: [rafaelbdefazio at gmail](mailto:rafaelbdefazio@gmail.com)
* Github: [@rafaeldefazio](https://github.com/rafaeldefazio)
* LinkedIn: [@rafaelbdefazio](https://www.linkedin.com/in/rafaelbdefazio/)


👤 **Adriano Henrique Cantão**
* E-mail: [adriano.cantao at gmail](mailto:adriano.cantao@gmail.com)
* Github: [@ahcantao](https://github.com/ahcantao)
* LinkedIn: [adriano-henrique-cantão-b64347113](https://www.linkedin.com/in/adriano-henrique-cant%C3%A3o-b64347113/)
