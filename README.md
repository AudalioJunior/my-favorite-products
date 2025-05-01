# Projeto FavoList

Este é um projeto desenvolvido utilizando o framework Nest.js com um banco de dados PostgreSQL e frontend com React. o Objetivo é favoritar produtos em uma lista.

:bust_in_silhouette: **Responsável:** Audálio Junior  

## Pré-requisitos

Docker instalado na máquina local (Instalação do Docker)
Docker Compose instalado na máquina local (Instalação do Docker Compose)

## Configuração

1. Clone o repositório do projeto:

git clone https://github.com/AudalioJunior/my-favorite-products.git

2. Atualize as dependências dos dois projetos:

cd nest-my-favorite-products
cd react-my-favorite-product

npm install

3. Baixe as depedências do projeto:

npm install

4. Configure as variáveis de ambiente:

Copie o arquivo .env.example e renomeie para .env.

Preencha as variáveis de ambiente necessárias no arquivo .env. Certifique-se de fornecer as credenciais corretas para o banco de dados PostgreSQL.

## Execução

Para executar o projeto, basta usar o Docker Compose. Certifique-se de estar no diretório raiz do projeto e execute o seguinte comando:

docker-compose up --build

Isso iniciará os contêineres Docker para o Nest.js e o PostgreSQL. Após a inicialização, sua aplicação estará disponível em http://localhost:3000.

**Detalhe**: Caso já tenha subido o contêiner, só executar o _npm run start:dev_

## Testes

Para testar a aplicação, você pode usar os seguintes métodos:

Teste manualmente acessando os endpoints da aplicação em http://localhost:3000.
Execute testes automatizados, se disponíveis, dentro do contêiner Docker.


## Encerrando

Quando você terminar de usar o projeto, você pode parar e remover os contêineres Docker usando o seguinte comando:

docker-compose down

## Autor

Este projeto foi desenvolvido por Audálio Junior.
