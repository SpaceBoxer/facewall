# facewall

An open-source version of Spacebox's Facewall by Vue. Adapted from [facewall](https://github.com/HubSpot/facewall)

## Configuring

- First thing you'll want to do is update the following files:
    - [config.js](https://github.com/config.js)

- Next, you'll want to configure [home.vue](https://github.com/initialize-employees.js) with either a URL. The format of the JSON needs to be the following:

```json
[
  {
    "email": "email@gmail.com",
    "firstName": "firstName",
    "lastName": "lastName",
    "role": "employee"
  }
  // ...
]
```

## Running

``` bash
yarn install
npm start
npm run lintfix
npm run build
```
