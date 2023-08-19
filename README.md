# Projeto Curious

O "Curious" é um aplicativo web interativo que oferece uma plataforma para compartilhar e explorar receitas de panquecas. O projeto é construído com tecnologias web, incluindo HTML, CSS, JavaScript, Node.js e MySQL.

Vídeo do projeto: [Youtube](https://youtu.be/j07VDZcFMLk)

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


## Funcionalidades

- Realize a autenticação de usuário para acesso personalizado.
- Explore receitas de panquecas e suas informações de tempo de preparo, quantidade de porções e veja o link da receita no youtube.
- Crie e compartilhe suas próprias receitas com a comunidade.
- Busque por receitas específicas com base em seus títulos.
- Edite ou exclua suas próprias receitas.


# Como executar

Após clonar o repositório, siga os seguintes passos para executar:

Certifique-se de ter o `node.js` e o `mysql` instalados em sua máquina. Você pode baixá-los em seus sites oficiais:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

Antes de começar, instale as seguintes ferramentas em seu ambiente de desenvolvimento:

Adicione a pasta node_modules com:

```
npm install
```

Certifique-se de ter o express instalado com:

```
npm install express
```

E então, crie o banco de dados `curious` com:

```
CREATE DATABASE curious;

USE curious;
CREATE TABLE IF NOT EXISTS Users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

USE curious;
CREATE TABLE IF NOT EXISTS Curious (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  servings INT NOT NULL,
  time_taken VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  UserId INT UNSIGNED NOT NULL,
  FOREIGN KEY (UserId) REFERENCES Users(id)
);
```

Para povoar o banco de dados, há um arquivo `povoamento` na pasta `scriptsSQL` com todos os dados de dois usuários e 4 receitas. Lembrando também que na pasta `public/img/receitas` estão as imagens das receitas criadas no arquivo `povoamento.sql`, caso você não queira usar as receitas de `povoamento.sql` pode excluir *apenas* as imagens dessa pasta, não exclua a pasta em si senão o código não vai encontrar o diretório para salvar as imagens das futuras receitas criadas.

Após isto, apenas execute o comando `npm start` na raiz do projeto para inicializar o servidor.


# Funcionamento do projeto

O funcionamento do projeto consiste na parte frontend desenvolvida em HTML, CSS e JavaScript, com um backend em Node.js executando um servidor Express e interagindo com um banco de dados local MySqL.
Juntamente na parte do frontend, há o Controller `CuriousController`, responsável por intermediar e gerenciar a visualização do frontend com os eventos do banco de dados.
Há também o Controller `AuthController`, responsável por gerenciar as interações e operações relacionadas aos usuários do sistema. Isso inclui atividades como autenticação, criação e gerenciamento de contas de usuário.


## Middleware

Esse trecho de código, configura o middleware de sessão para o aplicativo utilizando o pacote express-session. Ele é responsável por gerenciar e manter o estado das sessões dos usuários enquanto interagem com o aplicativo, garantindo que os dados da sessão do usuário sejam mantidos de forma segura e eficiente, permitindo a autenticação e personalização das interações do usuário com o projeto.  O `express-mysql-server` cria uma tabela chamada `session` automaticamente no banco de dados assim que a primeira inicialização do projeto é feita, essa tabela não é mostrada no diagrama ER por conta de existir apenas por questões de autentificação do usuário.

```
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "curious", // Use your session database name
  });

  app.use(
    session({
      name: "session",
      secret: "nosso_secret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    })
  );
```

```
module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid

  if (!userId) {
    res.redirect('/login')
  }

  next()
}
```

Em resumo, esse middleware `checkAuth` é utilizado para verificar se um usuário está autenticado antes de permitir o acesso a determinadas rotas. Se o usuário não estiver autenticado, ele é redirecionado para a página de login. Se estiver autenticado, a solicitação continua seu fluxo normalmente. Isso é útil para proteger rotas que requerem autenticação antes de permitir que um usuário acesse essas áreas do aplicativo.


## Estrutura do projeto

O projeto segue a seguinte estrutura de diretórios:

```
controllers/: Contém os controladores responsáveis pela lógica das rotas.
db/: Contém a conexão com o banco de dados MySql.
helpers/: Contém os recursos para execução do middleware.
public/: Contém os recursos estáticos como CSS, imagens e scripts JavaScript.
routes/: Define as rotas da aplicação.
scriptsSQL/: Define o povoamento do banco de dados.
views/: Armazena os templates HTML utilizados nas visualizações.
index.js: Arquivo principal que inicia o servidor.
```

# Curious
