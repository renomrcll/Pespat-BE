# pespat-BE

# ENDPOINTS
## User 
POST 
```js
/api/users/login
```
POST 
```js
/api/users/register
```
PATCH 
```js
/api/users/:id
```
GET 
```js
/api/users/:id
```


## Place
POST 
```js
/api/places/
```
GET 
```js
/api/places/
```
PATCH 
```js
/api/places/:id
```
GET 
```js
/api/places/:id
```
DELETE 
```js
/api/places/:id
```

## Reservation
POST 
```js
/api/reservations/
```
GET 
```js
/api/reservations/
```
PATCH 
```js
/api/reservations/:id
```
GET 
```js
/api/reservations/:id
```
DELETE 
```js
/api/reservations/:id
```

## Payment 
POST 
```js
/api/payments/
```
GET 
```js
/api/payments/
```
PATCH 
```js
/api/payments/:id
```
GET 
```js
/api/payments/:id
```
DELETE 
```js
/api/payments/:id
```

# run local 

.env file
#express config

PORT = 24407
HOST = localhost
HOST_URL = http://localhost:8080


#firebase database config

API_KEY=AIzaSyBSBxPq9dK1Nz4r8UAmpx4iobatdHKN0mg
AUTH_DOMAIN=pespat-7c504.firebaseapp.com
PROJECT_ID=pespat-7c504
STORAGE_BUCKET=pespat-7c504.appspot.com
MESSAGING_SENDER_ID=688298288247
APP_ID=1:688298288247:web:7b9260b824e593785d9272
APP_SECRET=secretOrSecret
