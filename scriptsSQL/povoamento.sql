/* Observação ultra importante: deve ser criado, primeiramente, um usuário no sistema,
para que o banco de dados reconheça que as receitas pertencentes a cada id de usuário.

Observação ultra importante 2: a senha para as duas contas que eu criei para povoar o banco de dados é 
123, tô falando isso pois ao inserir os dados no banco de dados a senha é inserida como hash */

USE curious;
INSERT INTO `users` (`id`, `name`, `email`, `password`)
VALUES
  ('1', 'Jessica', 'jessjca@jessjca.com.br', '$2a$10$d5haMKla/ZrhiMgyTSTM0.o9SpO2nJWJGwu4hswL9yK8UoVtIzifS'),
  ('2', 'Bruno', 'bruno@bruno.com.br', '$2a$10$jikADRbG4KmpMVY/j41SquSmNbniteW63Q2E.j0bSt8q9HVOIMN8K');


USE curious;
INSERT INTO `curious` (`id`, `title`, `link`, `image`, `description`, `servings`, `time_taken`, `content`, `UserId` )
VALUES
  ('1', 'Panqueca de Chocolate', 'https://www.youtube.com/watch?v=QhFRRSDVluM', '4d49b27a541cfaa37d1b2f77f0692062.jpeg', 'Desperte os sentidos e inicie o dia com uma indulgência irresistível: panquecas de chocolate. Esta receita é um convite para os amantes do chocolate e da comfort food, trazendo uma combinação perfeita entre o rico sabor do cacau e a textura macia das panq', '1', '15 minutos', 
  'Ingredientes:
 
 1 xícara de farinha de trigo
 2 colheres de sopa de cacau em pó (chocolate em pó)
 2 colheres de sopa de açúcar
 1 colher de chá de fermento em pó
 1/2 colher de chá de bicarbonato de sódio
 1/4 colher de chá de sal
 1 ovo
 1 xícara de leite
 2 colheres de sopa de óleo vegetal
 1/2 colher de chá de extrato de baunilha (opcional)
 Gotas de chocolate (opcional)
 Manteiga ou óleo para untar a frigideira
 Instruções:
 
 Em uma tigela grande, misture a farinha de trigo, o cacau em pó, o açúcar, o fermento em pó, o bicarbonato de sódio e o sal.
 
 Em outra tigela, bata o ovo e depois adicione o leite, o óleo e o extrato de baunilha (se estiver usando). Misture bem os ingredientes líquidos.
 
 Adicione os ingredientes líquidos à mistura de ingredientes secos. Mexa delicadamente até que a massa esteja bem combinada. Se desejar, adicione algumas gotas de chocolate à massa e misture.
 
 Aqueça uma frigideira antiaderente em fogo médio. Unte levemente a frigideira com manteiga ou óleo.
 
 Use uma concha de servir para despejar pequenas porções de massa na frigideira quente. Cozinhe até que bolhas comecem a se formar na superfície das panquecas.
 
 Vire as panquecas com uma espátula e cozinhe o outro lado até ficar dourado.
 
 Repita o processo com o restante da massa, untando a frigideira conforme necessário.
 
 Sirva as panquecas de chocolate quentes, acompanhadas de xarope de bordo, frutas frescas, chantilly ou outros acompanhamentos de sua escolha.
 
 Aproveite suas deliciosas panquecas de chocolate!', '1'),
 ('2', 'Panquecado do Cuphead', 'https://www.youtube.com/watch?v=_QgQsp9Lpbo', '8cb95cacf3712b7b72d3772abf3100bd.jpeg', 'Esta receita é um convite para os amantes do chocolate e de Cuphead, trazendo uma combinação perfeita entre o rico sabor do cacau e a textura macia das panquecas.', '5', '45 minutos', 
  'Ingredientes:
 
 1 xícara de farinha de trigo
 2 colheres de sopa de cacau em pó (chocolate em pó)
 2 colheres de sopa de açúcar
 1 colher de chá de fermento em pó
 1/2 colher de chá de bicarbonato de sódio
 1/4 colher de chá de sal
 1 ovo
 1 xícara de leite
 2 colheres de sopa de óleo vegetal
 1/2 colher de chá de extrato de baunilha (opcional)
 Gotas de chocolate (opcional)
 Manteiga ou óleo para untar a frigideira
 Instruções:
 
 Em uma tigela grande, misture a farinha de trigo, o cacau em pó, o açúcar, o fermento em pó, o bicarbonato de sódio e o sal.
 
 Em outra tigela, bata o ovo e depois adicione o leite, o óleo e o extrato de baunilha (se estiver usando). Misture bem os ingredientes líquidos.
 
 Adicione os ingredientes líquidos à mistura de ingredientes secos. Mexa delicadamente até que a massa esteja bem combinada. Se desejar, adicione algumas gotas de chocolate à massa e misture.
 
 Aqueça uma frigideira antiaderente em fogo médio. Unte levemente a frigideira com manteiga ou óleo.
 
 Use uma concha de servir para despejar pequenas porções de massa na frigideira quente. Cozinhe até que bolhas comecem a se formar na superfície das panquecas.
 
 Vire as panquecas com uma espátula e cozinhe o outro lado até ficar dourado.
 
 Repita o processo com o restante da massa, untando a frigideira conforme necessário.
 
 Sirva as panquecas de chocolate quentes, acompanhadas de xarope de bordo, frutas frescas, chantilly ou outros acompanhamentos de sua escolha.
 
 Aproveite suas deliciosas panquecas de chocolate!', '1'),
 ('3', 'Panqueca de Morango', 'https://www.youtube.com/watch?v=w0bAE9RSvag', '5685b10466613a7f7e5d2f846820157b.jpg', 'Com uma preparação simples e ingredientes de fácil acesso, você pode criar um café da manhã ou lanche excepcional que fará seus sabores favoritos dançarem no paladar.', '3', '20 minutos', 
  'Ingredientes:
 
 1 xícara de farinha de trigo
 2 colheres de sopa de cacau em pó (chocolate em pó)
 2 colheres de sopa de açúcar
 1 colher de chá de fermento em pó
 1/2 colher de chá de bicarbonato de sódio
 1/4 colher de chá de sal
 1 ovo
 1 xícara de leite
 2 colheres de sopa de óleo vegetal
 1/2 colher de chá de extrato de baunilha (opcional)
 Gotas de chocolate (opcional)
 Manteiga ou óleo para untar a frigideira
 Instruções:
 
 Em uma tigela grande, misture a farinha de trigo, o cacau em pó, o açúcar, o fermento em pó, o bicarbonato de sódio e o sal.
 
 Em outra tigela, bata o ovo e depois adicione o leite, o óleo e o extrato de baunilha (se estiver usando). Misture bem os ingredientes líquidos.
 
 Adicione os ingredientes líquidos à mistura de ingredientes secos. Mexa delicadamente até que a massa esteja bem combinada. Se desejar, adicione algumas gotas de chocolate à massa e misture.
 
 Aqueça uma frigideira antiaderente em fogo médio. Unte levemente a frigideira com manteiga ou óleo.
 
 Use uma concha de servir para despejar pequenas porções de massa na frigideira quente. Cozinhe até que bolhas comecem a se formar na superfície das panquecas.
 
 Vire as panquecas com uma espátula e cozinhe o outro lado até ficar dourado.
 
 Repita o processo com o restante da massa, untando a frigideira conforme necessário.
 
 Sirva as panquecas de chocolate quentes, acompanhadas de xarope de bordo, frutas frescas, chantilly ou outros acompanhamentos de sua escolha.
 
 Aproveite suas deliciosas panquecas de chocolate!', '1'),
 ('4', 'Panqueca de Flamengo', 'https://www.youtube.com/watch?v=Sx86-18V3m8', 'dc263a41bf010d90134eb687353185bb.png', 'Desfrute de uma refeição inspirada na paixão pelo futebol e no sabor autêntico brasileiro com as Panquecas à Moda do Flamengo. Essa receita une os sabores tradicionais das panquecas com um toque de criatividade que homenageia o time mais querido do Rio de', '8', '44 minutos', 
  'Ingredientes:
 
 1 xícara de farinha de trigo
 1 colher de sopa de açúcar
 1/2 colher de chá de sal
 1 ovo
 1 xícara de leite
 2 colheres de sopa de óleo vegetal
 Corante alimentício vermelho e preto (ou naturalmente, utilizando beterraba e tinta comestível)
 Recheio de sua escolha: frango desfiado, carne moída, queijo, presunto, etc.
 Molho de sua preferência
 Queijo ralado para finalizar
 Instruções:
 
 Em uma tigela, misture a farinha de trigo, açúcar e sal.
 
 Em outra tigela, bata o ovo e adicione o leite e o óleo. Misture bem.
 
 Gradualmente, adicione a mistura líquida à mistura de farinha, mexendo até obter uma massa lisa.
 
 Divida a massa em duas partes. Em uma delas, adicione corante alimentício vermelho até obter a cor rubro-negra característica do Flamengo.
 
 Aqueça uma frigideira antiaderente em fogo médio. Unte com um pouco de óleo.
 
 Despeje uma pequena quantidade de massa vermelha na frigideira, formando um círculo. Em seguida, despeje uma quantidade equivalente de massa preta no centro, criando o design característico do escudo do Flamengo.
 
 Cozinhe até que bolhas se formem na superfície da panqueca e, em seguida, vire cuidadosamente para cozinhar o outro lado.
 
 Repita o processo com o restante da massa.
 
 Coloque o recheio de sua escolha em cada panqueca e dobre-as.
 
 Sirva as panquecas com o molho de sua preferência e finalize com queijo ralado para dar um toque de sabor.
 
 Personalização Criativa:
 Crie suas próprias versões de panquecas do Flamengo com diferentes recheios e molhos. Você pode usar a criatividade para formar outros símbolos do clube, como o Urubu, mascote do time, ou até mesmo a silhueta do estádio Maracanã.', '2');