## Overview 📝

Projeto construído para simular custo e prazo de frete entre vários Operadores Logísticos, utilizando o framework [NestJs](https://docs.nestjs.com/).

## Requerimentos

- Docker (v25 ou superior)
- Node (v20)
- Yarn
- Postgres

## Instalação usando Docker 🐋

Após clonar o repositório na sua máquina, é necessário configurar a API_KEY do Google Maps para que a aplicação funcione corretamente.

Dentro do arquivo `.env.example`, insira o valor da `API_KEY` dentro da linha que contém a variável `GOOGLE_API_KEY={API_KEY}`.

Após essa configuração, basta executar o script `./start.sh` para subir os containers da aplicação.

```bash
$ chmod +x ./start.sh
$ ./start.sh
```

## Instalação sem Docker 👨‍💻

Após clonar o repositório na sua máquina, é necessário instalar as depedências e configurar o banco de dados manualmente.

Dentro do arquivo `.env.example` temos as informações do banco de dados. Mude conforme a necessidade:

```
DB_HOST=pg
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres
DB_SCHEMA=public
```

Após a configuração das variáveis de ambiente, siga os seguintes passos para rodar a aplicação:


```bash
$ cp .env.example .env
$ yarn install
$ yarn migration:run
$ yarn seed:run
$ yarn run start
```

Após o último comando, a aplicação está disponível no seguinte endereço: [http://localhost:3060/](http://localhost:3060/) 

💡 Você pode mudar a porta que a aplicação ficará disponível apenas mudando a variável `APP_PORT`.

## Testes 🖋️

A aplicação contém alguns testes unitários, para executá-los basta rodar o comando (após ter configurado o ambiente no passo anterior):

```bash
$ yarn test
```

## Documentação 📕

A API contém integração com o [Swagger](https://swagger.io/). Após configurar a aplicação (tanto por docker, quanto manualmente), a documentação ficará disponível no seguinte endereço:

```
http://localhost:3060/docs
```