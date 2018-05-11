# node-blog-app

A simple node based blogging app, in which users can share stories, pictures, information, etc.

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose.js](http://mongoosejs.com/)
* [Passport.js](http://www.passportjs.org/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Bulma](https://bulma.io/)

## Live Demonstration

Live project link <https://vast-ravine-67523.herokuapp.com/>

## Features

* As an unauthenticated user, I can sign in/up via Google sign-in.
* As an authenticated user, I can create, read, update and delete my own posts.
* As an authenticated user, I can create, read, update and delete my own comments.
* As an authenticated user, I can comment on any posts.
* As an unauthenticated or authenticated user, I can view all blogposts entries.
* As an unauthenticated or authenticated user, I can view a single blogpost entry.
* As an unauthenticated or authenticated, I can do full text searching.

## Installation

To get started, run this in your terminal:

```
> git clone git@github.com:rmasianjr/node-blog-app.git
> cd node-blog-app
> npm install
```

In the root of the project create a _variables.env_ file, and populate it with the following data:

```
NODE_ENV=development
DATABASE=your-mongodb-url
SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

To start the app, simply run:

```
> npm start
```

for development, run:

```
> npm run dev
```

Then go to [http://localhost:3000](http://localhost:3000)

## Author

[Ricardo Masian Jr.](https://github.com/rmasianjr)
