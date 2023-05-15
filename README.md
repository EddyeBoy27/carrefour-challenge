<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Seja bem vindo ao repositório do Projeto de <b>Fluxo de Caixa</b> para o desafio técnico da vaga de Desenvolvedor Backend Senior no Carrefour.

O objetivo desta aplicação é realizar o controle de lançamentos de crédito e débito de um comércio como também as informações de saldo consolidado dos mesmos.

- Esta aplicação segue um padrão de microserviço utilizando o framework NestJs e Messageria com Kafka.

- Decorators, Strategies e Guards como <b>Design Patterns</b>.

- Arquitetura MVC

- Testes Unitários

- Autenticação via token JWT

Outras bibliotecas utilizadas:

- Helmet
- Bcrypt

Banco de dados:

- PostgreSQL
- MongoDB

---

# Para iniciar o projeto é necessário obter o <strong>Docker</strong> na sua máquina, e para testá-lo é necessário o Postman

- ### Faça o download do Docker no site oficial <a src="https://www.docker.com/get-started/">Docker</a>

- ### Faça o download do Postman no site oficial <a src="https://www.postman.com/downloads/">Postman</a>

## Instalação

### Toda a instalação de bibliotecas, node, banco de dados, etc, será orquestrado pelo docker, basta utilizar o terminal ou shell e navegar até a pasta do repositório clonado do projeto e produzir o seguinte comando:

```bash
$ docker-compose up --build
```

## Para te

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
