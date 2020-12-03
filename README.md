# Recuperacao de senha

**RF (Requisitos Funcionais)**

- O usuario deve poder recuperar sua senha informando o seu e-mail;
- O usuario deve receber um e-mail com instrucoes de recuperacao de senha
- O usuario deve poder resetar sua senha

**RNF (Requisitos Nao Funcionais)**

- Utilizar Mailtrap para testar envios em abiente de desenvolvimento;
- Utilizar o Amazon SES para envios em producao;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regras de Negocio)**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar a sua senha;


# Atualizacao do perfil

**RF**

- O usuario deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuario nao pode alterar seu e-mail para um e-mail ja utilizado;
- Para atualizar sua senha, o usuario deve informar sua senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia especifico
- O prestador deve receber uma notificacao sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificacoes nao lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- AS notificacoes do prestador devem ser armazenadas no MongoDB;
- As notificacoes do prestador devem ser enviadas em tempo-real utilizando Socket.io;
 
**RN**

- A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar;

# Agendamento de servicos

**RF**

- O usuario deve poder listar todos os prestadores de servicos cadastrados;
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realzar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;
- 

**RN**

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponiveis entre 8h as 18h (primeiro horario as 8h, ultimo as 17h);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario nao pode agendar em um horario que ja passou;
- O usuario nao pode agendar servicos consigo mesmo;