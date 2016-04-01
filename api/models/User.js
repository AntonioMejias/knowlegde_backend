/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id: {
        type: 'integer',
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: 'string',
        unique: true,
        required: true
      },
      name: {
        type: 'string'
      },
      edad:{
          type: 'integer'
      },
      password: {
        type: 'string',
        required: true
      },
      email: {
        type: 'email',
        required: true,
        unique: true
      },
      urlFoto :{
        type: 'string',
      },
      tests: {
            collection: 'test',
            via: 'user',
            through: 'usertest'
      }
  }
};

