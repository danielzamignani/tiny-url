# Tiny URL

Tiny URL é um projeto desenvolvido usando NestJS, com TypeORM e PostgreSQL como banco de dados. Esta aplicação permite que os usuários encurtem URLs longas e gerenciem suas URLs encurtadas.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

-   **Docker**
-   **Docker Compose**

## Configuração do Ambiente

Clone este repositório:

```bash
git clone https://github.com/danielzamignani/tiny-url.git
```

Navegue até o diretório do projeto:

```bash
cd tiny-url
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como modelo.

## Executando o Projeto

### Iniciando o Banco de Dados e a Aplicação

Use Docker Compose para iniciar o banco de dados PostgreSQL e a aplicação NestJS:

```bash
docker-compose up
```

O servidor estará disponível em `http://localhost:3000/v1`.

## Acessando a Documentação

A documentação da API está disponível no Swagger. Após iniciar o projeto, você pode acessá-la em:

```
http://localhost:3000/api
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
