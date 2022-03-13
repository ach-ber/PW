/*
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);

*/
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host:"localhost",
    database:"DBProjet",
    password:"achille2001",
    port:5432,
});

module.exports = pool;