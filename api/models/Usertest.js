/**
 * Usertest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    aciertos: {
      type: 'integer'
    },
    fallos: {
      type: 'integer'
    },
    user:{
      model:'user'
    },
    test:{
      model:'test'
    }

  }
};

