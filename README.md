# live-click-api

This is a ```Node.js RestAPI``` developed for my [live-click](https://github.com/krzysiou/live-click) website. It contains endpoints which allow front-end to send and request data. It got hot-reload feature using nodemon. To host server on your computer simply type ```npm install``` and follow it by ```nodemon index.js```.

## Technologies

- Express
- Joi
- JWT

## Overview

The most important file on the whole server must be [index.js](./index.js), it contains all endpoints corresponding to given functions that will be called upon request hitting the endpoint.
I designed a few controllers located in [this folder](./controllers) they contain methods which operate on set of values and manage the data accordingly. Make sure to provide your working directory with ```.env file``` containing key ```ACCESS_TOKEN_SECRET=``` and give it a custom value of your choice. It is used to generate and sign JWT tokens.

## Controllers

I divided the controllers section into four parts ```Authorization Users Rooms and Validation```.

### Authorization [file](./controllers/check-auth.js)

This file contains method that authorizes every secured endpoint meaning that it guards contents of the page that shouldn't be operatable by users that are not logged in. It checks if JWT token was passed in a request header and verifies it by decoding the token using ```ACCESS_TOKEN_SECRET```
In case of successful authorization, user is allowed to access the endpoint. In any other case endpoint is blocked and error is sent to front-end.

### Users [file](./controllers/users.js)

It consists of list of methods that allow server to fully operate on user data. It allows to: ```check users```,
```register user``` by encrypting its credentials and generating JWT token, ```log user in``` it checks credentials and if correct returns JWT token, ```udpate user``` which allows to set custom username.

### Rooms [file](./controllers/rooms.js)

It consists of list of methods that allow server to fully operate on rooms data. It allows to: ```check rooms```, ```create room```, ```delete room```, ```add user to room```, ```remove user from room```, ```add user to bracket``` which helps forming the bracket, ```clear bracket``` which resets room bracket,```play``` which starts the five second cuntdown to the beggining of another game.

### Validation [file](./controllers/validation.js)

This file is based on ```Joi's``` validation. It consists of schemas that are used to validate if values of keys of passed objects got valid properties.
The validation throws error if any of the properties isn't valid.
