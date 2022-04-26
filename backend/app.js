/*
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');


mongoose.connect('mongodb+srv://achbertest:passwordtest@cluster0.9awmu.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); // intercepte les requete qui conient json et met contenu sur objet requete dans req.body 
// équivalent bodyparser

app.use('/api/stuff', stuffRoutes);

module.exports = app;

*/

const express = require('express');
const Routes = require('./routes/stuff');
const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api',Routes);

app.listen(port, () => 
    console.log('server listenning on port 4000'));