const knex = require("knex");

const knexConfig = require("../knexfile.js");

const dbEnv = process.env.NODE_ENV || "development";
console.log("ENV:", process.env.NODE_ENV);

module.exports = knex(knexConfig[dbEnv]);
