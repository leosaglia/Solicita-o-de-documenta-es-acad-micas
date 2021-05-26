# Sistema de solicitações de documentos acadêmicos

Este sistema possui o objetivo de gerenciar solicitações de documentos acadêmicos, voltado para estudantes e membros da secretária acadêmica.

### Funcionalidades
* Login com dois perfis de acesso (Estudante e Secretaria acadêmica)

* No perfil de aluno, poderá solicitar documentos,  solicitando prioridade (se necessário), poderá acompanhar suas solicitações (em aberto e encerradas) 
e poderá editar seus dados pessoais.

* No perfil secretaria acadêmica, poderá realizar cadastro, edição e consulta de alunos, documentos e funcionários, poderá consultar as solicitações de 
documentos (encaminhadas e fechadas), atualizar o status delas (quando necessário) e prorrogar ou antecipar a data prazo presente na solicitação. 
Também poderá filtrar as solicitações por prioridade, data e aluno, terá a possibilidade de incluir comentários na solicitação e concluí-la.

* Ao realizar cadastro de alunos, será enviado um e-mail via smtp para o e-mail cadastrado com dados do login.

## Interfaces

<div display="flex" align="center">
  <img src="https://user-images.githubusercontent.com/42787747/119578017-1a5b5480-bd92-11eb-8b59-a3fb6b4e45f6.PNG" width="500">
  <img src="https://user-images.githubusercontent.com/42787747/119578088-44147b80-bd92-11eb-9afe-0b0d3c010cb7.PNG" width="500">
</div>
<div display="flex" align="center">
  <img src="https://user-images.githubusercontent.com/42787747/119578096-4676d580-bd92-11eb-8cb3-9a129811951f.png" width="500">
  <img src="https://user-images.githubusercontent.com/42787747/119578102-48409900-bd92-11eb-91aa-bb3830e4fc68.PNG" width="500">
</div>

## Tecnologias utilizadas
* Backend - Node + Typescript
* Frontend - React
* Banco de dados - Sqlite

## Pré - requisitos

Para rodar este projeto é necessário  possuir algum gerenciador de pacotes com o <a href="https://www.npmjs.com/get-npm"> npm </a> 
ou o <a href="https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable"> yarn </a>.

## Instalação

### Clonando repositório 

```
git clone https://github.com/leosaglia/Trabalho-MPCT.git
```

### Instalando dependências

```
cd Server
cd frontend
```

Em cada uma das pastas utilizar o seguinte comando:

```
yarn
```
ou
```
npm install
```

### Rodar a aplicação

Para iniciar a aplicação, é necessária que todas as dependências tenham sido instaladas (passo anterior), e após isso deve ser iniciado o servidor backend:
```
cd backend
yarn start
```

ou

```
cd backend
npm start
```

Após iniciar o servidor backend - rodar o frontend:
```
cd frontend
yarn start // ou npm start
```

