/**
 * Test.js
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
      nombre: {
        type: 'string',
        unique: true,
        required: true
      },
      questions :{
          collection: 'question',
          via: 'test'
      },
      users: {
            collection: 'user',
            via: 'test',
            through: 'usertest'
      }
  } 
};

