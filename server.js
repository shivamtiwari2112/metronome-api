const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const app = express();

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
    // connect to your own database here
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'metronome'
    }
  });

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/',(req,res)=> { res.send("it is working")});
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`listening of port ${process.env.PORT}`);
})