# Cia de Danca Server

API Node.js/Express para o app Cia de Danca. Ela fornece autenticacao JWT e dados base do campeonato consumidos pelo Flutter.

## Tecnologias

- Node.js
- Express
- Sequelize
- SQLite
- bcryptjs
- jsonwebtoken
- Joi
- Swagger UI

## Configuracao

Crie ou ajuste o arquivo `.env` na raiz:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

Instale as dependencias:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

A API roda em `http://localhost:3000` e a documentacao fica em `http://localhost:3000/api-docs`.

## Endpoints

### Autenticacao

- `POST /users/register`
  - Body: `{ "name": "Ana", "email": "ana@email.com", "password": "123456", "role": "evaluator" }`
  - Retorna: `{ success, message, token, user }`

- `POST /users/login`
  - Body: `{ "email": "ana@email.com", "password": "123456" }`
  - Retorna: `{ success, message, token, user }`

- `GET /users/me`
  - Header: `Authorization: Bearer <token>`
  - Retorna: `{ success, message, user }`

- `POST /users/logout`
  - Header: `Authorization: Bearer <token>`
  - Retorna: `{ success, message }`

### Campeonato

- `GET /championship/app-data`
  - Retorna grupos, apresentacao atual e perfis base usados pelo app.

## Papeis aceitos

- `evaluator`
- `admin`
- `professional`
