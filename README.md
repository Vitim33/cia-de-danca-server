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
SEED_USER_PASSWORD=123456
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

## Usuarios iniciais para teste

Ao iniciar, o servidor cria os perfis base do app como usuarios, caso ainda nao existam. A senha padrao e `123456`, ou o valor de `SEED_USER_PASSWORD`.

- `juliana.avaliador@email.com` (`evaluator`)
- `admin@dancechamp.com` (`admin`)
- `beatriz.dance@email.com` (`professional`)

## Endpoints

### Autenticacao

- `POST /users/register`
  - Body: `{ "name": "Ana", "email": "ana@email.com", "password": "123456", "role": "evaluator" }`
  - Retorna: `{ success, message, token, user }`

- `POST /users/login`
  - Body: `{ "email": "ana@email.com", "password": "123456" }`
  - Retorna: `{ success, message, token, user }`

- `POST /users/forgot-password`
  - Body: `{ "email": "ana@email.com" }`
  - Retorna: `{ success, message, resetLink }` quando o e-mail existir

- `POST /users/reset-password`
  - Body: `{ "token": "<token>", "password": "123456" }`
  - Retorna: `{ success, message }`

- `GET /forgot-password`
  - Tela web para solicitar recuperacao ou redefinir senha via `?token=<token>`.

- `GET /users/me`
  - Header: `Authorization: Bearer <token>`
  - Retorna: `{ success, message, token, user }`

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
