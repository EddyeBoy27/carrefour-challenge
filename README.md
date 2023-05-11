<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Seja bem vindo ao repositório do Projeto de <b>Fluxo de Caixa</b> para o desafio técnico da vaga de Desenvolvedor Backend Senior no Carrefour.

O objetivo desta aplicação é realizar o controle de lançamentos de crédito e débito de um comércio como também as informações de saldo consolidado dos mesmos.

- Esta aplicação segue um padrão de microserviço utilizando o framework NestJs, Health Check e Messageria com Kafka.

- Decorators, Strategies e Guards como <b>Design Patterns</b>.

- Arquitetura MVC

- Testes Unitários

- Documentação da API utilizando Swagger

- Autenticação via token JWT

- Registro de Logs com Winston

Outras bibliotecas utilizadas:

- Vault
- Helmet
- Bcrypt

Banco de dados:

- PostgreSQL
- MongoDB

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
