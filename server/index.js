require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {registerUser} = require('./controllers/authController');
const {loginUser} = require('./controllers/authController');
const {getUser} = require('./controllers/authController');
const {logout} = require('./controllers/authController');

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))



//endpoints
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);
app.get('/auth/user', getUser);
//not delete because not really have an id
//session object
app.post('/auth/logout', logout);



massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database Connected')
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})