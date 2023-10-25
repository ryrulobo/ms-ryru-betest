# ms-ryru-betest

### Database setup:

Make sure you have MongoDB and Redis databases installed on your system. If not, you can install them from their official websites.

### Installation

- Install with npm

  ```
  npm install
  ```

- Setup .env variables using .env.template file

### Run application:

```
npm install
```

### API Reference

_Postman collection is attached on the repo._

#### Connection test

```http
  GET /
```

#### User Register

```http
  POST /users/register
```

| Body           | Type     | Description  |
| :------------- | :------- | :----------- |
| `userName`     | `string` | **Required** |
| `emailAddress` | `string` | **Required** |
| `password`     | `string` | **Required** |

#### User Login

```http
  POST /users/login
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `userName` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get All Users

```http
  GET /users
```

| Headers        | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. _from login method_ |

#### Get User By Identity Number

```http
  GET /users/user/id/:identityNumber
```

| Headers        | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. _from login method_ |

| Params           | Type     | Description   |
| :--------------- | :------- | :------------ |
| `identityNumber` | `string` | **Required**. |

#### Get User By Account Number

```http
  GET /users/user/acc/:accountNumber
```

| Headers        | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. _from login method_ |

| Params          | Type     | Description   |
| :-------------- | :------- | :------------ |
| `accountNumber` | `string` | **Required**. |

#### Delete User By ID

```http
  DELETE /users/user/:id
```

| Headers        | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. _from login method_ |

| Params | Type     | Description   |
| :----- | :------- | :------------ |
| `id`   | `string` | **Required**. |

#### Edit User By ID

```http
  PUT /users/user/:id
```

| Headers        | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. _from login method_ |

| Params | Type     | Description   |
| :----- | :------- | :------------ |
| `id`   | `string` | **Required**. |

| Body           | Type     | Description  |
| :------------- | :------- | :----------- |
| `userName`     | `string` | **Required** |
| `password`     | `string` | **Required** |
| `emailAddress` | `string` | **Optional** |
