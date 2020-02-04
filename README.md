# What Sup!

"What Sup!" is a full-stafk web application running on Node, Express, MySQL, and Handlebars. Authenticated users may search the applicaiton database for events happening near them. Events are then displayed on an interactive map, where they can see the name, time, and venue relevant to the event.

Events are crowd-sourced - authenticated users may enter events they would like to share. These can be anything from concerts, to pub crawls, right down to local club gatherings and hangout/meet-ups.

## Organization

The app runs on Node.js, using the Express framework. Data is persisted to a MySQL database. Finally, views are generated using the Handlebars framework.

User authentication is handled via Passport.js. *All user passwords are encrypted before being persisted, using the bcrypt strategy*.

This is a Full-Stack Web Application following the MVC design pattern.

## Accessing the App

What Sup! is currently deployed to Heroku.

You may access the app here: [What Sup!](https://fathomless-shore-70783.herokuapp.com/)

## Technologies Used
<b>Built With</b>

- [Node.js](https://www.nodejs.org)
    - [Express](https://www.npmjs.com/package/express)
    - [MySQL](https://www.npmjs.com/package/mysql)
    - [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
    - [Passport](http://www.passportjs.org/)
    - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    - [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com)
- [Handlebars](https://handlebarsjs.com/)
- [Tom Tom SDK](https://developer.tomtom.com/maps-sdk-web-js)

## Credits

- <b>Developed By: </b>
  - Will Parks -- [wparks08](https://www.github.com/wparks08) -- Back-end development; User Authentication, API routes, ORM implementation
  - Everardo Gomez Santiago -- [gomez1ever1](https://www.github.com/Gomez1Ever1) -- Front & Back end; TomTom SDK development, event forms
  - Dean McClusky -- [deanmcclusky](https://www.github.com/deanmccluskey) -- Front-end development; UI Design and implementation
  
