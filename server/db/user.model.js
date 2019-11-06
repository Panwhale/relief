/**
 * ************************************
 *
 * @module  user.model.js
 * @author Benjamin Morrison/Timothy Mai
 * @date 11/5/19
 * @description database queries for user table in database
 *
 * ************************************
 */

module.exports = {
  createTable: () => `
    create table if not exists user (
        id serial not null unique,
        username varchar(255) not null unique,
        password varchar(255) not null unique,
        email varchar(255) not null unique,
        constraint "user_pk" PRIMARY KEY ("id")
    ) with (
        OIDS=FALSE
    )`, // create table if not exists
  checkUsernameAndEmail: 'SELECT * FROM "user" WHERE username = $1 OR email = $2', // when signing up, check if username or email has been used already
  createUser: 'INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3) RETURNING username', // creates user on user table
  getUser: 'SELECT * FROM "user" WHERE username = $1 AND password = $2', // gets user info
  updateUser: '', // change user info
  deleteUser: '', // delete user info
};
