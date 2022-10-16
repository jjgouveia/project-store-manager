# Projeto - Store Manager

## 🔨 Desenvolvimento

A proposta deste projeto era a de arquitetar e desenvolver uma API RESTfull integrada a um banco de dados MySQL, em que fosse possível utilizar endpoints para criar, exibir, atualizar e excluir (C.R.U.D.) produtos e vendas. Tudo isso utilizando o padrão arquitetural MSC (Model, Service e Controller).

## 💻 Tecnologias utilizadas

* JavaScript
* NodeJS
* Express
* chai
* sinon
* mocha

## Lições aprendidas e/ou reforçadas

* Escrever o código utilizando o padrão <em>M.S.C.</em> de arquitetura de software por camadas;
* Fazer validações com a biblioteca JOI;
* Criar rotas baseadas em <em>C.R.U.D.</em> e aplicar middlewares;
* Escrever API's RESTfull utilizando Node e Express;
* Escrever testes assíncronos utilizando o <em>chai</em>, <em>sinon</em> e o <em>mocha</em>;

## 🛠 Instalação local

Clone o projeto:

```bash
  git clone git@github.com:jjgouveia/project-store-manager.git
```

Vá até a pasta do projeto:

```bash
  cd project-store-manager
```

Instale as dependências:

```bash
  npm install
```

Inicie a aplicação:

```bash
  npm start
  ou
  npm run dev
```

## 🛠 Instalação no Docker
Após clonar o repositório e acessar a pasta do projeto, execute o serviço <code>node</code> com o comando <code>docker-compose up -d</code>.

Esse serviço irá inicializar um container chamado <code>store_manager</code>.
A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
Use o comando docker <code>exec -it store_manager bash</code>.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
Instale as dependências com o comando <code>npm install</code>.

Execute a aplicação com <code>npm start</code> ou <code>npm run dev</code>.
