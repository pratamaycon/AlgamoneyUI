# SPA Gerência de Gastos Pessoais - AlgamoneyUI -

##### [Overview Sistema](https://www.youtube.com/watch?v=mm_gY-g8zuQ&feature=youtu.be)

## Requisitos

- Angular **VERSION `9 ou Superior`**
- Ter a API Restful rodando 
    - [Link API](https://github.com/pratamaycon/algamoney-api)

## Tecnologias Utilizadas

- PrimeNG **VERSION `9 ou Superior`**
- ng2-currency-mask 
- moment
- ng2-toasty
- chart.js
- @auth0/angular-jwt

## Funcionalidades Desenvolvidas Durante o período do curso...

 #### Tela de Login
  - Autenticação do usuário com login e senha correspondente na base de dados.

 #### Tela Dashboard
  - Exibe dois gráficos que exibem grupos estatisticos distintos
      - ***Gráfico de Pizza***: Exibe as estatisticas dos lançamentos por categoria. Obs: Somente serão exibidos lançamentos que estão válidos.
      - ***Gráfico de Linha***: Exibe as estatisticas dos lançamentos pelo dias. Obs: Somente serão exibidos lançamentos que estão válidos.

#### Tela de Pessoas
 - Operações de GRUD na Entidade Pessoa
 - Cada pessoa pode ter um ou mais contatos...

#### Tela de Lançamentos
 - Operações de GRUD na Entidade Lançamentos
 - Permite anexar um pdf junto

#### Tela Relatórios
 - Geração de relatórios de acordo com intervalos de datas.

#### Logout
 - Mata o cookie com refresh_token, fazendo com que o usuário perca seu acesso e retorne para tela de login novamente. Precisa se autenticar no sistema de novo.

## Funcionalidades Desenvolvidas com o objetivo de melhora do projeto...
