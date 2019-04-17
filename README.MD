# facewall

An open-source version of Spacebox's Facewall.

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
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm i

npm start

# auto repair lint error
npm run lintfix

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
